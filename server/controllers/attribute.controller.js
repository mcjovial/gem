const attributesService = require("../services/attribute.service");

exports.createAttribute = (req, res, next) => {
  attributesService
    .create(req.body)
    .then(res.status(201).json({ message: "Attribute created successfull" }))
    .catch(next);
};

exports.getAllAttribute = (req, res, next) => {
  attributesService
    .findAll(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.getOneAttribute = (req, res, next) => {
  attributesService
    .findOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateAttribute = (req, res, next) => {
  attributesService
    .update(req.params.id, req.body)
    .then((data) =>
      res
        .status(200)
        .json({ ...data, message: "Attribute updated successfull" })
    )
    .catch(next);
};

exports.deleteAttribute = (req, res, next) => {
  attributesService
    .remove(req.params.id)
    .then((data) =>
      res.status(200).json({ message: "Attribute deleted successfull" })
    )
    .catch(next);
};
