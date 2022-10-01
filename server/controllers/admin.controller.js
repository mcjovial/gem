const adminService = require('../services/admin.service')

exports.getAllOrders = (req, res, next) => {
  adminService.getAllOrders.then((data) => res.status(200).json(data)).catch(next)
};

exports.changeOrderStatus = (req, res, next) => {
  adminService.getAllOrders(req.body).then((data) => res.status(201).json(data)).catch(next)  
};
