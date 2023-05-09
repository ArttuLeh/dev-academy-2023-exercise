const stationsRouter = require('express').Router()
const Station = require('../models/stations')
const Journey = require('../models/journey')

stationsRouter.get('/', async (req, res) => {
  const { page = 1, limit = 40 } = req.query
  try {
    const data = await Station.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Station.count()
    res.json({ data, totalPages: Math.ceil(count / limit), currentPage: page })
  } catch (error) {
    console.error(error.message)
  }
})

stationsRouter.get('/:id', async (req, res) => {
  try {
    const data = await Station.findOne({ ID: req.params.id })
    const departureStationCount = await Journey.countDocuments({
      Departure_station_id: req.params.id,
    })
    const returnStationCount = await Journey.countDocuments({
      Return_station_id: req.params.id,
    })
    res.json({ data, departureStationCount, returnStationCount })
  } catch (error) {
    console.error(error.message)
    res.status(404).end()
  }
})

module.exports = stationsRouter
