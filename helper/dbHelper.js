const mongoose = require('mongoose')
const constants = require('../constants')

module.exports.formatMongoData = (data) => {
  if(Array.isArray(data)) {
    let formattedData = []
    for (const value of data) {
      formattedData.push(value.toObject())
    }
    return formattedData
  }
  return data.toObject()
}

module.exports.validateObjectId = (id) => {
  if(!mongoose.isValidObjectId(id)) {
    throw new Error(`${constants.databaseMessage.INVALID_ID}: ${id}`)
  }
}