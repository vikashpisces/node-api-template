const Joi = require('@hapi/joi')
const constants = require('../constants/')

const validateObjectSchema = (data, schema) => {
  const { error } = schema.validate(data, { convert: false })
  if(error) {
    const errorDetails = error.details.map( err => {
      return {
        error: err.message,
        path: err.path
      }
    })
    return errorDetails
  }
  return null
}
module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.body, schema)
    let response = { ...constants.defaultServerResponse }
    if(error) {
      response.message = constants.requestValidationMessage.BAD_REQUEST
      response.body = response
      return res.status(response.status).send(error)
    }
    return next()
  }
}

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.query, schema)
    let response = { ...constants.defaultServerResponse }
    if(error) {
      response.message = constants.requestValidationMessage.BAD_REQUEST
      response.body = response
      return res.status(response.status).send(error)
    }
    return next()
  }
}