const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.createCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.updateCategorySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};
