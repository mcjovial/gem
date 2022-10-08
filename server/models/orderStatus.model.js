const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    serial: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);

module.exports = OrderStatus;
