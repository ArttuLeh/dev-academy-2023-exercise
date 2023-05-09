const journeyRouter = require('express').Router()
const Journeys = require('../models/journey')

journeyRouter.get('/', async (req, res) => {
  const { page = 1, limit = 40 } = req.query
  try {
    const data = await Journeys.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Journeys.count()

    res.json({ data, totalPages: Math.ceil(count / limit), currentPage: page })
  } catch (error) {
    console.error(error.message)
  }
})
journeyRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const departureCount = await Journeys.countDocuments({
    Departure_station_id: id,
  })
  const returnCount = await Journeys.countDocuments({
    Return_station_id: id,
  })
  res.json({ departureCount, returnCount })
})
module.exports = journeyRouter
