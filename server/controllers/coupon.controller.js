const couponService = require("../services/coupon.service");

exports.createCoupon = (req, res, next) => {
  couponService
    .create(req.body)
    .then((data) =>
      res.status(201).json({ ...data, message: "Coupon created successfuly" })
    )
    .catch(next);
};

exports.removeCoupon = (req, res, next) => {
  couponService
    .remove(req.params.id)
    .then((data) =>
      res.status(200).json({ ...data, message: "Coupon deleted successfuly" })
    )
    .catch(next);
};

exports.getCoupons = (req, res, next) => {
  couponService
    .getAll(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.getCoupon = (req, res, next) => {
  couponService
    .getOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateCoupon = (req, res, next) => {
  couponService
    .update(req.params.id, req.body)
    .then((data) => res.status(201).json(data))
    .catch(next);
};
exports.verifyCoupon = (req, res, next) => {
  couponService
    .verify(req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
