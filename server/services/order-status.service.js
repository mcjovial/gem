const OrderStatus = require("../models/orderStatus.model");

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
}

async function create(body) {
  return await OrderStatus.create(body);
}

async function getAll() {
  return await OrderStatus.find({})
}

async function getOne(id) {
  return await OrderStatus.findById(id)
}

async function update(
  id,
  body,
) {
  return await OrderStatus.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true },
  );
}

async function remove(id) {
  return await OrderStatus.findByIdAndRemove(id, { new: true });
}
