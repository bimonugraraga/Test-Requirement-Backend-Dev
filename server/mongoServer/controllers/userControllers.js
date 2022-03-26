const User = require('../models/Users')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
class UserController{
  static async registerNewUser(req, res, next){
    let {name, email, password} = req.body
    // console.log(req.body)
    try {
      if (!name){       
        throw {
          code: 400,
          name: "Bad Request",
          message: "Name Is Required!",
        }
      }

      if (!email){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Email Is Required!",
        }
      }

      if (!password){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Password Is Required!",
        }
      }

      let targetUser = await User.findOne(email)
      if (targetUser){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Email Has Been Taken!",
        }
      }
      let payload = {
        name, email, password
      }

      let newUser = await User.create(payload)
      res.status(201).json({message: newUser})
    } catch (error) {
      res.status(error.code).json({ message: error.message });
    }
  }

  static async loginUser (req, res, next){
    let {email, password} = req.body
    console.log(req.body)
    try {
      if (!email){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Email Is Required!",
        }
      }

      if (!password){
        throw {
          code: 400,
          name: "Bad Request",
          message: "Password Is Required!",
        }
      }

      let targetUser = await User.findOne(email)
      if (!targetUser){
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid Email or Password!",
        }
      }

      let isPassword = bcrypt.compareSync(password, targetUser.password)
      if (!isPassword){
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid Email or Password!",
        }
      }
      let payload = {
        ...targetUser,
        password : undefined
      }
      var access_token = jwt.sign(payload, 'BIMODIMASNUGRARAGA');
      res.status(200).json({access_token: access_token})
    } catch (error) {
      res.status(error.code).json({ message: error.message });
    }
  }
}

module.exports = UserController