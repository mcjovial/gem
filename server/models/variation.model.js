const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const variationSchema = new Schema(
  {
    title: String,
    price: Number,
    sku: String,
    is_disable: Boolean,
    sale_price: Number,
    quantity: Number,
    product: {
      type: ObjectId,
      ref: "Product",
    },
    options: [
      {
        type: ObjectId,
        ref: "VariationOption",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Variation = mongoose.model("Variation", variationSchema);

module.exports = Variation;
