const Joi = require('@hapi/joi')

module.exports.createProductSchema = Joi.object().keys({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required()
})

module.exports.getAllProducts = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string()
})

module.exports.updateProductSchema = Joi.object().keys({
  name: Joi.string(),
  brand: Joi.string(),
  price: Joi.number()
})