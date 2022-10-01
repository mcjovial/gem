const {
  saveUserCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
} = require("../../controllers/cart.controller");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();

router.post("/", authorize(), saveUserCart); // save cart
router.get("/", authorize(), getUserCart); // get cart
router.delete("/", authorize(), emptyCart); // empty cart
router.post("/address", authorize(), saveAddress); // re-apropriate
router.post("/coupon", authorize(), applyCouponToUserCart);

module.exports = router;
