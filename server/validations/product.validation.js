const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.createProductSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    subs: Joi.string().empty(""),
    quantity: Joi.number().required(),
    images: Joi.string().empty(""),
    shipping: Joi.string().required(),
    color: Joi.string().required(),
    brand: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.updateProductSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    description: Joi.string().empty(""),
    price: Joi.number().empty(""),
    category: Joi.string().empty(""),
    subs: Joi.string().empty(""),
    quantity: Joi.number().empty(""),
    images: Joi.string().empty(""),
    shipping: Joi.string().empty(""),
    color: Joi.string().empty(""),
    brand: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};
