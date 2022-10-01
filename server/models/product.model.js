const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    product_type: {
      type: String,
      enum: ["simple", "variable"],
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    sale_price: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    subs: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: ObjectId,
        ref: "Tag",
      },
    ],
    variations: [
      {
        type: ObjectId,
        ref: "AttributeValue",
      },
    ],
    variation_options: [
      {
        type: ObjectId,
        ref: "Variation",
      },
    ],
    orders: [
      {
        type: ObjectId,
        ref: "Order",
      },
    ],
    in_stock: { type: Boolean, required: true, default: true },
    ratings: [
      {
        star: { type: Number, default: 0, min: 0, max: 5 },
        postedBy: { type: ObjectId, ref: "Account" },
      },
    ],
    quantity: Number,
    sku: String,
    unit: String,
    image: {
      type: Array,
    },
    gallery: {
      type: Array,
    },
    status: {
      type: String,
      enum: ["publish", "draft"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
