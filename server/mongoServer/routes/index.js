const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const authn = require('../middlewares/authn')
//!User Route
router.use('/users', userRoute)

router.use(authn)
//!Product Route
router.use('/products', productRoute)

module.exports = router