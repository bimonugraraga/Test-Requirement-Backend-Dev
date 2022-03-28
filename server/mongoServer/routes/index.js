const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute')
const authn = require('../middlewares/authn')

//!User Route
router.use('/users', userRoute)

//!Product Route
router.use('/products', productRoute)
//!Authn
router.use(authn)


//!Cart Route
router.use('/carts', cartRoute)

module.exports = router