const {verifyToken} = require('../helpers/jwt')

const User = require('../models/Users')

async function authn(req, res, next){
  let {access_token} = req.headers
  // console.log(access_token, "<>")
  try {
    if (!access_token){
      throw{
        code: 401,
        name: 'JsonWebTokenError',
        message: "Invalid token"

      }
    }

    let payload = verifyToken(access_token)

    if (!payload){
      throw{
        code: 401,
        name: 'JsonWebTokenError',
        message: "Invalid token"

      }
    }

    let {email} = payload
    let targetUser = await User.findOne(email)
    if (!targetUser){
      throw{
        code: 401,
        name: 'JsonWebTokenError',
        message: "Invalid token"

      }
    }

    req.loggedUser = {
      _id: targetUser._id,
      email: targetUser.email,
      name: targetUser.name
    }

    next()

  } catch (error) {
    if (error.name === 'JsonWebTokenError'){
      res.status(401).json({message: "Invalid token"});

    } else {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = authn