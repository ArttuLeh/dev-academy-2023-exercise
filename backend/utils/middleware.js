const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'TypeError') {
    return res.status(404).send({ error: 'not found' })
  } else if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  logger.error(error.message)

  next(error)
}
module.exports = {
  unknownEndpoint,
  requestLogger,
  errorHandler,
}
