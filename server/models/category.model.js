const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category" },
    children: [{ type: ObjectId, ref: "Category" }],
    description: String,
    image: String,
    icon: String,
    products: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
