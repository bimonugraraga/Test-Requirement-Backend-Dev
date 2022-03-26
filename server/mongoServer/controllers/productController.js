const Product = require('../models/Products')
const User = require('../models/Users')
class ProductController{
  static async getAllProduct(req, res, next){
    let {productName} = req.query
    try {
      if (!productName){
        productName = ''
      }
      let allProducts = await Product.findAll(productName)
      res.status(200).json(allProducts)
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
    }
  }

  static async createNewProduct(req, res, next){
    let {productName, price, imgUrl} = req.body
    let {_id, email} = req.loggedUser
    try {

      if (!productName){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Product Name Is Required!",
        }
      }

      if (!price){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Product Price Is Required!",
        }
      }

      if (!imgUrl){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Image URL Is Required!",
        }
      }

      let Owner = await User.findOne(email)
      delete Owner.password

      let payload = {
        productName,
        price: +price,
        imgUrl,
        UserId: _id,
        Owner: Owner
      }

      let newProduct = await Product.create(payload)
      
      res.status(201).json({message: newProduct})

    } catch (error) {
      if (error.name === "Bad Request"){
        res.status(error.code).json({ message: error.message });
      } else{
        res.status(500).json({message: "Internal server error"})
      }
    }

  }

  static async getOneProduct(req, res, next){
    let {_id} = req.params
    try {
      let targetedProduct = await Product.findByPk(_id)
      // console.log(targetedProduct)
      if (!targetedProduct){
        throw {
          code: 404,
          name: "NOT FOUND",
          message: "Product Not Found!",
        }
      }

      if (targetedProduct === 'Server Error'){
        throw {
          code: 500,
          name: "Server Error",
          message: "Internal server error",
        }
      }
      res.status(200).json(targetedProduct)
    } catch (error) {
      if (error.name === "NOT FOUND"){
        res.status(error.code).json({ message: error.message });
      } else{
        res.status(500).json({ message: error.message })
      }
    }
  }

}

module.exports = ProductController