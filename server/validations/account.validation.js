const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");


exports.authenticateSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.revokeTokenSchema = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
};

exports.registerSchema = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    // acceptTerms: Joi.boolean().valid(true).required(),
  });
  validateRequest(req, next, schema);
};

exports.verifyEmailSchema = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.forgotPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
};

exports.validateResetTokenSchema = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};

exports.resetPasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
};

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
  });
  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schemaRules = {
    username: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  };

  // only admins can update role
  if (req.user.role === Role.Admin) {
    schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty("");
  }

  const schema = Joi.object(schemaRules).with("password", "confirmPassword");
  validateRequest(req, next, schema);
};

