const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({})

journeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  },
})
module.exports = mongoose.model('Journey', journeySchema)
