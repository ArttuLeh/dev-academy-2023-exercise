const stationsRouter = require('express').Router()
const Station = require('../models/station')
const Journey = require('../models/journey')

// router which fetch all stations data from database
stationsRouter.get('/', async (req, res, next) => {
  const { page = 1, limit = 40 } = req.query
  const search = req.query.search || ''

  try {
    // search the data and paginate the data
    const data = await Station.find({ Nimi: { $regex: search, $options: 'i' } })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    if (data.length === 0) {
      //if searched data not found
      res.json({ success: false })
    } else {
      // counts all documents for pagination
      const count = await Station.countDocuments()
      res.json({
        success: true,
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    }
  } catch (error) {
    // convey error to middleware
    next(error)
  }
})

// router which fetch specific station data by id
stationsRouter.get('/:id', async (req, res, next) => {
  try {
    // search the station data by using _id
    const data = await Station.findOne({ _id: req.params.id })

    // counts journeys that start the station
    const departureStationCount = await Journey.countDocuments({
      Departure_station_id: data.ID,
    })
    // counts journeys that end the station
    const returnStationCount = await Journey.countDocuments({
      Return_station_id: data.ID,
    })
    // calculate the average distance of a journey starting from the station
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
    // calculate the average distance of a journey ending at the station
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
    // calculate and sort 5 most popular return stations for journeys starting from the station
    const sortReturnStation = await Journey.aggregate([
      {
        $match: {
          Departure_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Return_station_name',
          stationId: { $first: '$_id' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ])
    // calculate and sort 5 most popular departure stations for journeys ending at the station
    const sortDepartureStation = await Journey.aggregate([
      {
        $match: {
          Return_station_id: data.ID,
        },
      },
      {
        $group: {
          _id: '$Departure_station_name',
          stationId: { $first: '$_id' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ])
    if (departureStationCount === 0 || returnStationCount === 0) {
      res.json({
        success: false,
        data,
      })
    } else {
      //return object that contains all the data
      res.json({
        success: true,
        data,
        sortDepartureStation,
        sortReturnStation,
        departureStationDistance,
        returnStationDistance,
        departureStationCount,
        returnStationCount,
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = stationsRouter
