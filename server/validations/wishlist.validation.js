const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

exports.addWishlistSchema = (req, res, next) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};
