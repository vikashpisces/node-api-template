const jwt = require('jsonwebtoken')
const constants = require('../constants')

module.exports.validateToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse }
  try {
    let token = req.headers.authorization
    if(!token) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING)
    }
    token = token.split('Bearer')[1].trim()
    jwt.verify(token, process.env.PRIVATE_SECRET_KEY || constants.default.DEFAULT_PRIVATE_KEY)
    return next()
  } catch (error) {
    console.log('Something went wrong: tokenValidation: validateToken', error)
    response.message = error.message
    response.status = 401
  }
  return res.status(response.status).send(response)
}