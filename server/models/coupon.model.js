const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Code is required",
      minlength: [6, "Too short"],
      maxlength: [20, "Too long"],
    },
    description: String,
    orders: [
      {
        type: ObjectId,
        ref: "Order"
      }
    ],
    type: {
      type: String,
      enum: ["fixed", "percentage"],
    },
    is_valid: {
      type: Boolean,
      default: true
    },
    expire_at: {
      type: Date,
      required: true,
    },
    active_from: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
