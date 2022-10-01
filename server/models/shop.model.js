const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: String,
  description: String,
  logo: String,
  cover_image: String,
  email: String,
  admin_commission_rate: Number,
  total_earnings: Number,
  withdrawn_amount: Number,
  current_balance: Number,
  owner_id: {
    type: ObjectId,
    ref: "Account",
  },
  payment_info: {
    type: ObjectId,
    ref: "PaymentInfo",
  },
  address: {
    type: ObjectId,
    ref: "Address",
  },
  settings: {
    type: ObjectId,
    ref: "Settings",
  }

}, {
  timestamps: true
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop