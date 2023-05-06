const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const stationsRouter = require('./controllers/stationRouter')
const journeyRouter = require('./controllers/journeyRouter')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connect to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeyRouter)

module.exports = app
