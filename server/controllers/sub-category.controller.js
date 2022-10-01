const subCategoryService = require("../services/sub-category.service");

exports.create = (req, res, next) => {
  subCategoryService
    .create(req.body)
    .then(
      res.status(201).json({ message: "Sub category created successfully" })
    )
    .catch(next);
};

exports.list = (req, res, next) =>
  subCategoryService
    .list()
    .then((data) => res.status(200).json(data))
    .catch(next);

exports.read = (req, res, next) => {
  subCategoryService
    .read(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.update = (req, res, next) => {
  subCategoryService
    .update(req.body, req.params)
    .then((data) =>
      res
        .status(201)
        .json({ ...data, message: "Sub category updated successfully" })
    )
    .catch(next);
};

exports.remove = (req, res, next) => {
  subCategoryService
    .remove(req.params)
    .then(
      (data) => res.status(200).json({ ...data, message: "Sub category deleted successfully" })
    )
    .catch(next);
};
