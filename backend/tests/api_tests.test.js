const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Station = require('../models/station')
const Journey = require('../models/journey')
const helper = require('./test_helper')

describe('api tests', () => {
  beforeEach(async () => {
    await Station.deleteMany({})
    await Station.insertMany(helper.initialStations)
    await Journey.deleteMany({})
    await Journey.insertMany(helper.initialJourneys)
  })
  describe('when there are stations data', () => {
    test('stations data are returned as json', async () => {
      const response = await api
        .get('/api/stations')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.data).toHaveLength(helper.initialStations.length)
    })
    test('a station data has field id', async () => {
      const response = await api
        .get('/api/stations')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const station = response.body.data[0]

      expect(station.id).toBeDefined()
    })
  })

  describe('when there are journeys data', () => {
    test('journeys data are returned as json', async () => {
      const response = await api
        .get('/api/journeys')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.data).toHaveLength(helper.initialJourneys.length)
    })
    test('a journey data has field id', async () => {
      const response = await api
        .get('/api/journeys')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const journey = response.body.data[0]

      expect(journey.id).toBeDefined()
    })
  })

  describe('viewing a specific station', () => {
    test('a specific station found', async () => {
      const stations = await helper.stationsInDb()
      const stationToView = stations[0]

      const response = await api
        .get(`/api/stations/${stationToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedStationToView = JSON.parse(JSON.stringify(stationToView))
      console.log(processedStationToView)
      expect(response.body.data).toEqual(processedStationToView)
    })
    test('total number of journeys starting from the station and ending to the station', async () => {
      const stations = await helper.stationsInDb()
      const stationToView = stations[0]

      const response = await api
        .get(`/api/stations/${stationToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const depStationCount = response.body.stationsCount.departureStationCount
      expect(depStationCount).toEqual(2)

      const retStationCount = response.body.stationsCount.returnStationCount
      expect(retStationCount).toEqual(2)
    })
    test('the average distance of a journey starting from the station and ending to the station', async () => {
      const stations = await helper.stationsInDb()
      const stationToView = stations[0]

      const response = await api
        .get(`/api/stations/${stationToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const statringAvg =
        response.body.departureStationDistance[0].avgCoveredDistance
      expect(statringAvg).toEqual(5140)

      const endingAvg =
        response.body.returnStationDistance[0].avgCoveredDistance
      expect(endingAvg).toEqual(7059)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
