const mongoose = require('mongoose')

const stationsSchema = new mongoose.Schema({
  FID: Number,
  ID: Number,
  Nimi: String,
  Namn: String,
  Name: String,
  Osoite: String,
  Adress: String,
  Kaupunki: String,
  Stad: String,
  Operaattor: String,
  Kapasiteet: Number,
  x: Number,
  y: Number,
})
module.exports = mongoose.model('Station', stationsSchema)
