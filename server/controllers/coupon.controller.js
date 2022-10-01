const couponService = require("../services/coupon.service");

exports.createCoupon = (req, res, next) => {
  couponService
    .createCoupon(req.body)
    .then((data) =>
      res.status(201).json({ ...data, message: "Coupon created successfuly" })
    )
    .catch(next);
};

exports.removeCoupon = (req, res, next) => {
  couponService
    .removeCoupon(req.params.couponId)
    .then((data) =>
      res.status(200).json({ ...data, message: "Coupon deleted successfuly" })
    )
    .catch(next);
};

exports.listCoupon = (req, res, next) => {
  couponService
    .listCoupon()
    .then((data) => res.status(200).json(data))
    .catch(next);
};
