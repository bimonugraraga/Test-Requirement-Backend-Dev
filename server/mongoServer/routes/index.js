const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')

//!User Route
router.use('/users', userRoute)

module.exports = router