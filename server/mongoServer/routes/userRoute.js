const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')


router.get('/',  (req, res) => {
  res.status(200).json("IN USER ROUTE")
})

//!Register User
router.post('/register', UserController.registerNewUser)

//!Register User
router.post('/login', UserController.loginUser)

module.exports = router