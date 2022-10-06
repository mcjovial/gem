const Settings = require("../models/settings.model")

async function addSettings(params) {
  const body = params.options
  delete body.ogImage
  delete body.seo
  const val = await Settings.find({}).sort({ "_id": 1 }).limit(1)
  return await Settings.findByIdAndUpdate(
    val[0].id,
    {...body},
    { upsert: true, setDefaultsOnInsert: true })
}

async function getSettings() {
  const set = await Settings.find({}).sort({ "_id": 1 }).limit(1)
  return set[0]
}

module.exports = {
  addSettings,
  getSettings
}