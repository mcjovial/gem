const Account = require("../models/account.model");
const Cart = require("../models/cart.model");
const Coupon = require("../models/coupon.model");
const Product = require("../models/product.model");

module.exports = {
  saveUserCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
};

async function saveUserCart(params, userId) {
  const { cart } = params;

  let products = [];

  // check if cart with logged in user id already exist
  let loggedInUserCart = await Cart.findOne({ orderdBy: userId });

  // remove old cart
  if (loggedInUserCart) {
    loggedInUserCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id).select("price");
    object.price = productFromDb.price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: userId,
  }).save();

  console.log("new cart ----> ", newCart);
}

async function getUserCart(userId) {
  let cart = await Cart.findOne({ orderdBy: userId });
  if (!cart) throw "Cart is empty"
  cart.populate("products.product", "_id title price totalAfterDiscount");

  const { products, cartTotal, totalAfterDiscount } = cart;
  return { products, cartTotal, totalAfterDiscount };
}

async function emptyCart(userId) {
  return await Cart.findOneAndRemove({ orderdBy: userId });
}

async function saveAddress(userId, params) {
  return await Account.findOneAndUpdate(
    { _id: userId },
    { address: params.address }
  );
}

async function applyCouponToUserCart(userId, params) {
  const { coupon } = params;

  const validCoupon = await Coupon.findOne({ name: coupon });
  if (!validCoupon) throw "Invalid Coupon";

  let { products, cartTotal } = await Cart.findOne({
    orderdBy: userId,
  }).populate("products.product", "_id title price");

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  // update cart total
  await Cart.findOneAndUpdate(
    { orderdBy: userId },
    { totalAfterDiscount },
    { new: true }
  );

  return totalAfterDiscount;
}
