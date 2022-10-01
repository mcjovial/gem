const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  country: String,
  city: String,
  state: String,
  zip: Number,
  street: String
}, {
  timestamps: true
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address