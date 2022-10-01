const {
  createOrder,
  createCashOrder,
  orders,
  getOrders,
} = require("../../controllers/order.controller");
const Role = require("../../_helpers/role");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();

router.post("/", authorize(), createOrder); // stripe
router.post("/cash", authorize(), createCashOrder); // cod
router.get("/user", authorize(), orders);
router.get("/", authorize(Role.Admin), getOrders);

module.exports = router;
