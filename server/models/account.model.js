const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    verificationToken: String,
    verified: Date,
    resetToken: {
      token: String,
      expires: Date,
    },
    passwordReset: Date,
    profile: {
      type: ObjectId,
      ref: "Profile",
    },
    address: {
      type: ObjectId,
      ref: "Address",
    },
    wishlist: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

schema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

const Account = mongoose.model("Account", schema);

module.exports = Account;
