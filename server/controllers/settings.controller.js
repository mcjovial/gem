const settingService = require("../services/settings.service");

exports.createOrUpdate = (req, res, next) => {
  settingService
    .addSettings(req.body)
    .then((data) => res.status(201).json(data))
    .catch(next);
};

exports.getSettings = (req, res, next) => {
  settingService
    .getSettings()
    .then((data) => res.status(200).json({options: data}))
    .catch(next);
};