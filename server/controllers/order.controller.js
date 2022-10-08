const orderService = require("../services/order.service");

exports.createOrder = (req, res, next) => {
  orderService
    .createOrder(req.user.id, req.body.stripeResponse)
    .then(res.status(201).json({ message: "Order created successfully!" }))
    .catch(next);
};

exports.orders = (req, res, next) => {
  orderService
    .orders(req.user.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.getOrders = (req, res, next) => {
  orderService
    .getOrders(req.query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
exports.getOrder = (req, res, next) => {
  orderService
    .getOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
exports.updateStatus = (req, res, next) => {
  orderService
    .updateStatus(req.params.id, req.body.statusId)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.createCashOrder = (req, res, next) => {
  orderService
    .createCashOrder(req.user.id, req.body)
    .then(res.status(201).json({ message: "Cash order created successfully!" }))
    .catch(next);
};
