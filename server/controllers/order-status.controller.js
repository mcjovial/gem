const orderStatusService = require("../services/order-status.service");

exports.createOrderStatus = (req, res, next) => {
  orderStatusService
    .create(req.body)
    .then(data => res.status(201).json({...data, message: "Status created successfully!" }))
    .catch(next);
};

exports.getOrderStatus = (req, res, next) => {
  orderStatusService
    .getAll(req.query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.getOneStatus = (req, res, next) => {
  orderStatusService
    .getOne(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateOrderStatus = (req, res, next) => {
  orderStatusService
    .update(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({...data, message: "Status updated successfull" })
    )
    .catch(next);
};

exports.deleteOrderStatus = (req, res, next) => {
  orderStatusService
    .remove(req.params.id)
    .then(data => res.status(201).json({ ...data, message: "Status deleted successfully!" }))
    .catch(next);
};
