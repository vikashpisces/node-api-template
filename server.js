const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnection = require('./database/connection')
const tokenValidation = require('./middlewares/tokenValidation')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const pino = require('pino')
const logger = pino({ name: '', level: process.env.LOG_LEVEL || 'info' })
const httpLogger = require('pino-http')({ logger, prettifier: true })

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// DB connection
// dbConnection()

// Enable cors
app.use(cors())

//Request payload middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Logger
// app.use(httpLogger)
// Router middleware
// app.use('/', (req, res) => { res.send('Welcome to Node based API server')})
app.use(`/api/v1/product`, tokenValidation.validateToken, require('./routes/productRoutes'))
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/eum/', require('./routes/traceRoutes'))

// API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`)
})

//Error handling middleware
app.use(function (error, req, res, next) {
  logger.error(error.stack)
  res.status(500).send({
    status: 500,
    message: error.message,
    data: {}
  })
})