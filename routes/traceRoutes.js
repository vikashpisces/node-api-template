const express = require('express')
const router = express.Router()
const pino = require('pino')
const logger = pino({ name: '', level: process.env.LOG_LEVEL || 'info' })

router.post('/push', (req, res) => {
  logger.info(`Trace received at: ${Date()}`)
  logger.info(`Request Body: ${JSON.stringify(req.body)}`)
  return res.status(200).send({"message": 'Successfully recieved traces'})
})



module.exports = router