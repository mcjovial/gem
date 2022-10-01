const {
  createCoupon,
  listCoupon,
  removeCoupon,
} = require("../../controllers/coupon.controller");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();
const Role = require("../../_helpers/role");
const { createCouponSchema } = require("../../validations/coupon.validation");

router.post("/", authorize(Role.Admin), createCouponSchema, createCoupon);
router.get("/", authorize(Role.Admin), listCoupon);
router.delete("/:couponId", authorize(Role.Admin), removeCoupon);

module.exports = router;
