const Product = require('../database/models/productModel')
const { formatMongoData, validateObjectId } = require('../helper/dbHelper')
const constants = require('../constants')

module.exports.createProduct = async (serviceData) => {
  try {
    let product = new Product({ ...serviceData })
    let createdProduct = await product.save()   
    return formatMongoData(createdProduct)
  } catch (error) {
    console.log('Something went wrong: Service: createProduct', error)
    throw new Error(error)
  }
}

module.exports.getAllProducts = async ({ skip=0, limit }) => {
  try {
    let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit))
    return formatMongoData(products)
  } catch (error) {
    console.log('Something went wrong: Service: getAllProducts', error)
    throw new Error(error)
  }
}

module.exports.getProductById = async ({ id }) => {
  try {
    validateObjectId(id)
    let product = await Product.findById(id)
    if(!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
    }
    return formatMongoData(product)
  } catch (error) {
    console.log('Something went wrong: Service: getProductById', error)
    throw new Error(error)
  }
}

module.exports.updateProduct = async ({ id, updateInfo }) => {
  try {
    validateObjectId(id)
    let product = await Product.findByIdAndUpdate({ _id: id } , updateInfo , { new: true })
    if(!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
    }
    return formatMongoData(product)
  } catch (error) {
    console.log('Something went wrong: Service: updateProduct', error)
    throw new Error(error)
  }
}

module.exports.deleteProduct = async ({ id }) => {
  try {
    validateObjectId(id)
    let product = await Product.findByIdAndDelete(id)
    if(!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND)
    }
    return formatMongoData(product)
  } catch (error) {
    console.log('Something went wrong: Service: deleteProduct', error)
    throw new Error(error)
  }
}