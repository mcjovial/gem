const Settings = require("../models/settings.model")

async function addSettings(params) {
  const val = await Settings.find({}).sort({ "_id": 1 }).limit(1)
  return await Settings.findByIdAndUpdate(
    val[0].id,
    {params},
    { upsert: true, setDefaultsOnInsert: true })
  // console.log(val[0].id);
  // return await Setting.create(params)
}

async function getSettings() {
  const set = await Settings.find({}).sort({ "_id": 1 }).limit(1)
  return set[0]
}

module.exports = {
  addSettings,
  getSettings
}