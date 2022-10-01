const Order = require("../models/order.model");

module.exports = {
  getAllOrders,
  changeOrderStatus,
};

async function getAllOrders() {
  return await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
}

async function changeOrderStatus(params) {
  const { orderId, orderStatus } = params;
  return await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
}
