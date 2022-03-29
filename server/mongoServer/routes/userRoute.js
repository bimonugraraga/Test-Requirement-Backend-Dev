const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')




//!Register User
router.post('/register', UserController.registerNewUser)

//!Register User
router.post('/login', UserController.loginUser)

module.exports = router