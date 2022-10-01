const categoryService = require("../services/category.service");

exports.createCategory = (req, res, next) => {
  categoryService
    .create(req.body)
    .then(data => res.status(201).json({...data, message: "Category created successfully" }))
    .catch(next);
};

exports.findAllCategories = (req, res, next) => {
  categoryService
    .getCategories(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.findAllNewCategories = (req, res, next) => {
  categoryService
    .getCategoriesAll(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateOneCategory = (req, res, next) => {
  categoryService
    .update(req.params.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateMultipleCategories = (req, res, next) => {
  categoryService
    .updateMultiple(req.body, req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.deleteCategory = (req, res, next) => {
  categoryService
    .remove(req.params.id)
    .then((data) => res.status(200).json({ ...data, message: "Category deleted successfully" }))
    .catch(next);
};

exports.getOneCategory = (req, res, next) => {
  categoryService
    .getOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
