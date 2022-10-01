const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

// query, price, category, stars, sub, shipping, color, brand
exports.searchSchema = (req, res, next) => {
  const schema = Joi.object({
    query: Joi.string().empty(""),
    price: Joi.number().empty(""),
    category: Joi.string().empty(""),
    stars: Joi.number().empty(""),
    sub: Joi.string().empty(""),
    shipping: Joi.string().empty(""),
    color: Joi.string().empty(""),
    brand: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};
