const cartService = require("../services/cart.service");

exports.saveUserCart = (req, res, next) => {
  cartService
    .saveUserCart(req.body, req.user.id)
    .then(res.status(201).json({ message: "Cart created successfully!" }))
    .catch(next);
};

exports.getUserCart = (req, res, next) => {
  cartService
    .getUserCart(req.user.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.emptyCart = (req, res, next) => {
  cartService
    .emptyCart(req.user.id)
    .then((data) =>
      res.status(200).json({ message: "Cart is now Empty!" })
    )
    .catch(next);
};

exports.saveAddress = (req, res, next) => {
  cartService
    .saveAddress(req.user.id, req.body)
    .then((data) =>
      res.status(201).json({ ...data, message: "Address saved successfully!" })
    )
    .catch(next);
};

exports.applyCouponToUserCart = (req, res, next) => {
  cartService
    .applyCouponToUserCart(req.user.id, req.body)
    .then((data) =>
      res.status(201).json({ totalAfterDiscount:data, message: "Coupon applied successfully!" })
    )
    .catch(next);
};
