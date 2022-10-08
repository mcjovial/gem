const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const orderSchema = new Schema(
  {
    tracking_number: String,
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
    status: { type: ObjectId, ref: "OrderStatus" },
    amount: Number,
    discount: Number,
    total: Number,
    coupon: { type: ObjectId, ref: "Coupon" },
    orderedBy: { type: ObjectId, ref: "Account" },
    // vendor: { type: ObjectId, ref: "Shop" },
    // courier: { type: ObjectId, ref: "Account" },
    coupon: String,
    // delivery_time: Date,
    // billing_address: { type: ObjectId, ref: "Address" },
    delivery_address: String,
    // children: [{ type: ObjectId, ref: "Order" }],
    // parent_order: { type: ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
