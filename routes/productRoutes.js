const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const joiSchemaValidation = require('../middlewares/joiSchemaValidation')
const productSchema = require('../apiSchema/productSchema')

router.post('/', 
  joiSchemaValidation.validateBody(productSchema.createProductSchema),
  productController.createProduct
)

router.get('/', 
  joiSchemaValidation.validateQueryParams(productSchema.getAllProducts),
  productController.getAllProducts
)

router.get('/:id',
  productController.getProductById
)

router.put('/:id',
  joiSchemaValidation.validateBody(productSchema.updateProductSchema),
  productController.updateProduct
)

router.delete('/:id', productController.deleteProduct)

module.exports = router;