const journeyRouter = require('express').Router()
const Journeys = require('../models/journey')

journeyRouter.get('/', async (req, res) => {
  const data = await Journeys.find({}).limit(1000)
  res.json(data)
})
module.exports = journeyRouter
