const mongoose = require('mongoose')

const stationsSchema = new mongoose.Schema({
  FID: Number,
  ID: Number,
  name: String,
  address: String,
  town: String,
  operator: String,
  capasity: Number,
  x: Number,
  y: Number,
})
module.exports = mongoose.model('Station', stationsSchema)
