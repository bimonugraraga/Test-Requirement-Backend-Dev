const {getDatabase} = require('../config/mongoConnection')
const {ObjectId} = require('mongodb')

class Cart {
  static async findAll(likedId){
    try {
      const db = getDatabase()
      let allUserCart = await db.collection('Carts').find({
        likedId: likedId
      }).toArray()
      return allUserCart
    } catch (error) {
      return error
    }
  }
  static async create(payload){
    console.log(payload, "<><>")
    try {
      const db = getDatabase()
      let newProduct = await db.collection('Carts').insertOne(payload)

      return 'Product Added To Cart'
    } catch (error) {
      return error
    }
  }
}

module.exports = Cart