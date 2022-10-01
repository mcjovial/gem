const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const tagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    icon: String,
    products: [{ type: ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
