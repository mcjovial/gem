const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    trackingId: String,
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash On Delivery",
        "processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    total: Number,
    orderedBy: { type: ObjectId, ref: "Account" },
    vendor: { type: ObjectId, ref: "Shop" },
    courier: { type: ObjectId, ref: "Account" },
    coupon: String,
    delivery_time: Date,
    billing_address: { type: ObjectId, ref: "Address" },
    shipping_address: { type: ObjectId, ref: "Address" }
  
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
