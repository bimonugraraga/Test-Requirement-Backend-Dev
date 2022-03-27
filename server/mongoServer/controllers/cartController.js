const Product = require('../models/Products')
const User = require('../models/Users')
const Cart = require('../models/Cart')
class CartController {
  static async getAllCart(req, res, next){
    // console.log(req.loggedUser)
    let {_id} = req.loggedUser
    try {
      let allUserCart = await Cart.findAll(_id)
      res.status(200).json(allUserCart)
    } catch (error) {
      res.status(500).js({message: 'Internal server error'})
    }
  }
  static async addToCart(req, res, next){
    console.log(req.params, req.loggedUser)
    let {productId} = req.params
    let {email} = req.loggedUser
    let {size, gender} = req.body
    if (!size){
      size = 'L'
    }
    if (!gender){
      gender = 'Man'
    }

    try {
      let targetedProduct = await Product.findByPk(productId)
      if (!targetedProduct){
        throw {
          code: 404,
          name: "NOT FOUND",
          message: "Product Not Found!",
        }
      }
      targetedProduct.productId = targetedProduct._id
      delete targetedProduct._id
      console.log(targetedProduct, ">>><<<")
      let targetedUser = await User.findOne(email)
      delete targetedUser.password
      console.log(targetedUser, "<<<>>>")
      let payload = {
        ...targetedProduct,
        likedId: targetedUser._id,
        likedBy: targetedUser,
        size,
        gender
      }

      let addedToCart = await Cart.create(payload)
      console.log(addedToCart, ">><<")
      res.status(201).json({message: addedToCart})
    } catch (error) {
      if (error.name === "NOT FOUND"){
        res.status(error.code).json({ message: error.message });
      } else{
        res.status(500).json({ message: error.message })
      }
    }

  }
}

module.exports = CartController