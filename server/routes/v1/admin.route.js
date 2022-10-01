const express = require('express');
const router = express.Router();

// middlewares
const authorize = require('../../_middleware/authorize');

const Role = require('../../_helpers/role');
const { getAllOrders, changeOrderStatus } = require('../../controllers/admin.controller');

// routes
router.get('/orders', authorize(Role.Admin), getAllOrders);
router.put('/order-status', authorize(Role.Admin), changeOrderStatus);

module.exports = router;
