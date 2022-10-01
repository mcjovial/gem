const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentInfoSchema = new Schema({
  account: Number,
  name: String,
  bank: String,
}, {
  timestamps: true
})

const PaymentInfo = mongoose.model('PaymentInfo', paymentInfoSchema)

module.exports = PaymentInfo