const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const authn = require('../middlewares/authn')
router.get('/',  ProductController.getAllProduct)

router.get('/:_id',  ProductController.getOneProduct)

//!Authn
router.use(authn)


router.post('/', ProductController.createNewProduct)


module.exports = router