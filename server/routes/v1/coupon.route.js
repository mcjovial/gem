const {
  createCoupon,
  removeCoupon,
  getCoupons,
  getCoupon,
  verifyCoupon,
  updateCoupon,
} = require("../../controllers/coupon.controller");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();
const Role = require("../../_helpers/role");
const { createCouponSchema, verifyCouponSchema } = require("../../validations/coupon.validation");

router.post("/", authorize(Role.Admin), createCouponSchema, createCoupon);
router.get("/", authorize(), getCoupons);
router.get("/:id", authorize(), getCoupon);
router.post("/verify", authorize(), verifyCouponSchema, verifyCoupon);
router.put("/:id", authorize(Role.Admin), updateCoupon);
router.delete("/:id", authorize(Role.Admin), removeCoupon);

module.exports = router;
