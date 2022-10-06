const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.createCouponSchema = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    description: Joi.string().empty(""),
    expire_at: Joi.date().required(),
    amount: Joi.number().required(),
    active_from: Joi.date().required(),
    type: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.updateCouponSchema = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string().empty(""),
    description: Joi.string().empty(""),
    expire_at: Joi.date().empty(""),
    amount: Joi.number().empty(""),
    active_from: Joi.date().empty(""),
    type: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};
exports.verifyCouponSchema = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};
