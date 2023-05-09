const mongoose = require('mongoose')

const stationsSchema = new mongoose.Schema({
  ID: Number,
})

stationsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})
module.exports = mongoose.model('Station', stationsSchema)
