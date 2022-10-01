const analyticsService = require("../services/analytics.service");

exports.findAll = (req, res, next) => {
  analyticsService
    .findAll()
    .then((data) => res.status(200).json(data))
    .catch(next);
};
