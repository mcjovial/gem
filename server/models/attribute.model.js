const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const attributeSchema = new Schema(
  {
    name: String,
    slug: String,
    values: [
      {
        type: ObjectId,
        ref: "AttributeValue",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", attributeSchema);

module.exports = Attribute;
