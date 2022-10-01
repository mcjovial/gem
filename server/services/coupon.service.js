const Coupon = require("../models/coupon.model");

module.exports = {
  createCoupon,
  removeCoupon,
  listCoupon,
};

async function createCoupon(params) {
  const { name, expiry, discount } = params;
  return await new Coupon({ name, expiry, discount }).save();
}

async function removeCoupon(couponId) {
  await getCoupon(couponId)
  return await Coupon.findByIdAndDelete(couponId);
}

async function listCoupon() {
  return await Coupon.find({}).sort({ createdAt: -1 });
}

async function getCoupon(id) {
  const coupon = await Coupon.findById(id)
  if (!coupon) throw "Coupon not found"
}