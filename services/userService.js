const User = require('../database/models/userModel')
const constants = require('../constants')
const { formatMongoData } = require('../helper/dbHelper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.signup = async ({ email, password }) => {
  try {
    const userExists = await User.findOne({ email })
    if(userExists) {
      throw new Error(constants.userMessage.USER_EXISTS)
    }
    password = await bcrypt.hash(password, 10)
    let newUser = new User({ email, password })
    let result = await newUser.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('Something went wrong: Service: signup', error)
    throw new Error(error)
  }
}

module.exports.login = async ({email, password}) => {
  try {
    const findUserByEmail = await User.findOne({ email })
    if(!findUserByEmail) {
      throw new Error(constants.userMessage.USER_NOT_REGISTERED)
    }
    const isValidUser = await bcrypt.compare(password, findUserByEmail.password)
    if(!isValidUser) {
      throw new Error(constants.userMessage.INVALID_CREDENTIAL)
    }
    const token = jwt.sign({ id: findUserByEmail._id }, process.env.PRIVATE_SECRET_KEY || constants.default.DEFAULT_PRIVATE_KEY, { expiresIn: '1h' })
    return { token } 
  } catch (error) {
    console.log('Something went wrong: Service: login', error)
    throw new Error(error)
  }
}