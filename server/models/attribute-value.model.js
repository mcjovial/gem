const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const attributeSchema = new Schema(
  {
    value: String,
    meta: String,
    attribute: {
      type: ObjectId,
      ref: "Attribute",
    },
  },
  {
    timestamps: true,
  }
);

const AttributeValue = mongoose.model("AttributeValue", attributeSchema);

module.exports = AttributeValue;
