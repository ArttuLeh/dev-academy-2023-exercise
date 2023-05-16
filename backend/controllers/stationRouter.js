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
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error(error.message)
  }
})

stationsRouter.get('/:id', async (req, res) => {
  try {
    const data = await Station.findOne({ _id: req.params.id })

    const departureStationCount = await Journey.countDocuments({
      Departure_station_id: data.ID,
    })

    const returnStationCount = await Journey.countDocuments({
      Return_station_id: data.ID,
    })

    const departureStationDistance = await Journey.aggregate([
      {
        $match: {
          Departure_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Departure_station_id',
          avg: { $avg: '$Covered_distance_m' },
        },
      },
      {
        $project: {
          _id: '$_id',
          avgCoveredDistance: { $ceil: '$avg' },
        },
      },
    ])
    const returnStationDistance = await Journey.aggregate([
      {
        $match: {
          Return_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Return_station_id',
          avg: { $avg: '$Covered_distance_m' },
        },
      },
      {
        $project: {
          _id: '$_id',
          avgCoveredDistance: { $ceil: '$avg' },
        },
      },
    ])
    const sortReturnStation = await Journey.aggregate([
      {
        $match: {
          Departure_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Return_station_id',
          count: { $sum: '$Return_station_id' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ])
    const sortDepartureStation = await Journey.aggregate([
      {
        $match: {
          Return_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Departure_station_id',
          count: { $sum: '$Departure_station_id' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ])

    res.json({
      data,
      sortDepartureStation,
      sortReturnStation,
      departureStationDistance,
      returnStationDistance,
      stationsCount: { departureStationCount, returnStationCount },
    })
  } catch (error) {
    console.error(error.message)
    res.status(404).end()
  }
})

module.exports = stationsRouter
