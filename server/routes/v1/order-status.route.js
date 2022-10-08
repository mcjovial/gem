const router = require("express").Router();

// middlewares
const authorize = require("../../_middleware/authorize");
const Role = require("../../_helpers/role");
const {
  createAttribute,
  getAllAttribute,
  getOneAttribute,
  updateAttribute,
  deleteAttribute,
} = require("../../controllers/attribute.controller");
const { createOrderStatus, getOrderStatus, getOneStatus, updateOrderStatus, deleteOrderStatus } = require("../../controllers/order-status.controller");

// routes
router.post("/", authorize(Role.Admin), createOrderStatus);
router.get("/", getOrderStatus);
router.get("/:id", getOneStatus);
router.put("/:id", authorize(Role.Admin), updateOrderStatus);
router.delete("/:id", authorize(Role.Admin), deleteOrderStatus);

module.exports = router;
