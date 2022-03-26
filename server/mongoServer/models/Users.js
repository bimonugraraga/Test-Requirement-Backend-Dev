const {getDatabase} = require('../config/mongoConnection')
const {ObjectId} = require('mongodb')
var bcrypt = require('bcryptjs');
class User{
  static async create(payload){
    try {
      const db = getDatabase()
      payload.password = bcrypt.hashSync(payload.password, 8);
      console.log(payload)
      let newData = await db.collection('Users').insertOne(payload)
      
      return `${payload.name} Has Been Registered!`
    } catch (error) {
      return error
    }

  }

  static async findOne(email){

    try {
      const db = getDatabase()
      let findedUser = await  db.collection('Users').findOne({
        email: email
      })
      findedUser = {
        ...findedUser,
        password: undefined
      }

      return findedUser
    } catch (error) {
      return error
    }
  }
}

module.exports = User