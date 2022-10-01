const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
