const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.createSubCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    parent: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.updateSubCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    parent: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};
