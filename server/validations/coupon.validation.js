const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.createCouponSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    expiry: Joi.date().required(),
    discount: Joi.number().required(),
  });
  validateRequest(req, next, schema);
};

exports.updateCouponSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    expiry: Joi.date().empty(""),
    discount: Joi.number().empty(""),
  });
  validateRequest(req, next, schema);
};
