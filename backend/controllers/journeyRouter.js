const journeyRouter = require('express').Router()
const Journeys = require('../models/journey')

journeyRouter.get('/', async (req, res) => {
  const { page = 1, limit = 40, sort = '' } = req.query
  try {
    const data = await Journeys.find({})
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Journeys.count()

    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error(error.message)
  }
})
journeyRouter.get('/:id', async (req, res) => {
  try {
    const data = await Journeys.findById(req.params.id)
    res.json(data)
  } catch (error) {
    console.error(error.message)
    res.status(404).end()
  }
})
module.exports = journeyRouter
