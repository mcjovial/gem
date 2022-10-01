const router = require('express').Router();

// middlewares
const authorize = require('../../_middleware/authorize');
const Role = require('../../_helpers/role');
const { findAll } = require('../../controllers/analytics.controller');

// routes
router.get('/', authorize(Role.Admin), findAll);

module.exports = router;
