const {getDatabase} = require('../config/mongoConnection')
const {ObjectId} = require('mongodb')

class Product{
  static async findAll(prodName){
    prodName = prodName.toUpperCase()
    try {
      const db = getDatabase()
      let allProducts = await db.collection('Products').find({}).toArray()
      if (allProducts){
        allProducts = allProducts.filter((el) => {
          if (el.productName.match(prodName)){
            return el
          }
        })
      }
      return allProducts
    } catch (error) {
      return error
    }
  }

  static async create(payload){
    console.log(payload, "<<<")
    try {
      const db = getDatabase()
      let newProduct = await db.collection('Products').insertOne(payload)

      return 'Product Has Been Added'
    } catch (error) {
      return error
    }
  }

  static async findByPk(_id){
    console.log(_id)
    try {
      const db = getDatabase()
      let targetedProduct = await db.collection('Products').findOne({"_id": ObjectId(_id)})
      // console.log(targetedProduct)
      if (!targetedProduct){
        return null
      }
      return targetedProduct
    } catch (error) {
      
      return 'Server Error'
    }
  }
}

module.exports = Product