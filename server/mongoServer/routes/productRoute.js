const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/',  ProductController.getAllProduct)

router.get('/:_id',  ProductController.getOneProduct)

router.post('/', ProductController.createNewProduct)


module.exports = router