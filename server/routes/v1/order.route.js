const {
  createOrder,
  createCashOrder,
  orders,
  getOrders,
  getOrder,
  updateStatus,
} = require("../../controllers/order.controller");
const Role = require("../../_helpers/role");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();

router.post("/", authorize(), createOrder); // stripe
router.post("/cash", authorize(), createCashOrder); // cod
router.get("/user", authorize(), orders);
router.get("/", authorize(Role.Admin), getOrders);
router.get("/:id", authorize(), getOrder);
router.put("/:id", authorize(Role.Admin), updateStatus);
router.delete("/:id", authorize(Role.Admin), getOrders);

module.exports = router;
