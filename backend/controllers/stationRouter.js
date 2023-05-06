const stationsRouter = require('express').Router()
const Stations = require('../models/stations')

stationsRouter.get('/', async (req, res) => {
  const data = await Stations.find({})
  res.json(data)
})

stationsRouter.get('/:id', async (req, res) => {
  const data = await Stations.findById(req.params.id)
  if (data) {
    res.json(data)
  } else {
    res.status(404).end()
  }
})

module.exports = stationsRouter
