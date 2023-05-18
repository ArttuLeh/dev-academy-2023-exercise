const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
  Departure_station_id: Number,
  Departure_station_name: String,
  Return_station_id: Number,
  Return_station_name: String,
  Covered_distance_m: Number,
  Duration_sec: Number,
})

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Journey', journeySchema)
