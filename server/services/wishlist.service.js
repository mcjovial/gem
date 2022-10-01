const Account = require("../models/account.model");
const Product = require("../models/product.model");

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

async function addToWishlist(userId, params) {
  const { productId } = params;
  await checkProduct(productId)
  // const user = await Account.findById(userId)
  // const exists = user.wishlist.exists
  return await Account.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { wishlist: productId } }, {new: true}
  );
}

async function getWishlist(userId) {
  return await Account.findById(userId).select("wishlist").populate("wishlist");
}

async function removeFromWishlist(userId, params) {
  const { productId } = params;
  await checkProduct(productId)
  return await Account.findOneAndUpdate(
    { _id: userId },
    { $pull: { wishlist: productId } }, {new: true}
  );
}

async function checkProduct(id) {
  const product = await Product.findById(id)
  if (!product) throw "Product not found"
}