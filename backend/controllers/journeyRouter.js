const journeyRouter = require('express').Router()
const Journeys = require('../models/journey')

// router which fetch all journeys data from database
journeyRouter.get('/', async (req, res, next) => {
  const { page = 1, limit = 40 } = req.query
  const search = req.query.search || ''
  const sortField = req.query.sortField || ''
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1

  try {
    let sortedData

    //counting documents for pagination
    const count = await Journeys.countDocuments()

    if (sortField) {
      // if a sortfield is given, this will find and sort and paginate all journeys
      sortedData = await Journeys.find({})
        .sort({ [sortField]: sortOrder })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()
      res.json({
        sortedData,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } else if (search) {
      // if a search value is given, this will find all journeys that match the value
      sortedData = await Journeys.aggregate([
        {
          $match: {
            Departure_station_name: { $regex: search, $options: 'i' },
          },
        },
        {
          $facet: {
            metadata: [
              { $count: 'total' },
              {
                $addFields: { currentPage: page },
              },
            ],
            data: [{ $skip: (page - 1) * limit }, { $limit: limit * 1 }],
          },
        },
      ])
      if (sortedData[0].metadata.length === 0) {
        // if there aren't journeys that match the value, send the info to the user
        res.json({ success: false })
      } else {
        // if journey found, send the paginated data
        const totalPages = Math.ceil(sortedData[0].metadata[0].total / limit)
        const currentPage = sortedData[0].metadata[0].currentPage
        res.json({
          success: true,
          sortedData,
          totalPages: totalPages,
          currentPage: currentPage,
        })
      }
    } else {
      // if no value is given, send all the paginated data
      sortedData = await Journeys.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

      res.json({
        sortedData,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    }
  } catch (error) {
    next(error)
  }
})
journeyRouter.get('/:id', async (req, res, next) => {
  try {
    const data = await Journeys.findById(req.params.id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
module.exports = journeyRouter
