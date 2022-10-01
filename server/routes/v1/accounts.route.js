const express = require("express");
const { authenticate, refreshToken, revokeToken, register, verifyEmail, forgotPassword, validateResetToken, resetPassword, getAll, getById, create, update, _delete, getInfo } = require("../../controllers/accounts.controller");
const authorize = require("../../_middleware/authorize");
const Role = require('_helpers/role');
const { authenticateSchema, revokeTokenSchema, registerSchema, verifyEmailSchema, forgotPasswordSchema, validateResetTokenSchema, resetPasswordSchema, createSchema, updateSchema } = require("../../validations/account.validation");
const router = express.Router();

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.post('/register', registerSchema, register);
router.post('/verify-email', verifyEmailSchema, verifyEmail);
router.post('/forgot-password', forgotPasswordSchema, forgotPassword);
router.post('/validate-reset-token', validateResetTokenSchema, validateResetToken);
router.post('/reset-password', resetPasswordSchema, resetPassword);
router.get('/', authorize(Role.Admin), getAll);
router.get('/info', authorize(), getInfo);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;
