const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

router.get('/', CartController.getAllCart)

router.post('/:productId', CartController.addToCart)


module.exports = router