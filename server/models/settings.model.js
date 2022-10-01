const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  logo: String,
  siteTitle: String,
  siteSubtitle: String,
  currency: String,
  minimumOrder: Number,
  walletCurrencyRatio: Number,
  signupPoints: Number,
  otpCheckout: Boolean,
  taxClass: String,
  shippingClass: String,
  // SEO
  metaTitle: String,
  metaDescription: String,
  metaTags: String,
  canonicalUrl: String,
  ogTitle: String,
  ogDescription: String,
  // ogImage: String,
  twitterHandle: String,
  twitterCardType: String
}, {
  timestamps: true
})

const Settings = mongoose.model('Settings', settingsSchema)

module.exports = Settings