const uniqueid = require("uniqueid");
const crypto = require("crypto");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

module.exports = {
  createOrder,
  orders,
  getOrders,
  createCashOrder,
};

async function createOrder(userId, stripeResponse) {
  const { paymentIntent } = stripeResponse;

  let { products } = await Cart.findOne({ orderdBy: userId });

  await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});
}

async function orders(userId) {
  return await Order.find({ orderdBy: userId }).populate("products.product");
}

async function getOrders(query) {
  // createdAt/updatedAt, desc/asc, 3
  console.log(query);
  const { page, limit, orderBy, sortedBy } = query;
  const currentPage = page || 1;

  // return await Product.find({$text: { $search: search }})
  return await Order.find({})
    .skip((currentPage - 1) * limit)
    .populate("products.product")
    .populate("orderedBy")
    .populate("vendor")
    .populate("courier")
    .sort([[orderBy, sortedBy]])
    .limit(limit);
}

async function createCashOrder(userId, params) {
  const { COD, couponApplied } = params;
  // if COD is true, create order with status of Cash On Delivery
  if (!COD) throw "Create cash order failed";

  let userCart = await Cart.findOne({ orderdBy: userId });

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount;
  } else {
    finalAmount = userCart.cartTotal;
  }

  await new Order({
    trackingId: generateTrx(),
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd", // TODO: dynamical insert from site settings
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    total: finalAmount,
    orderedBy: userId,
    status: "Cash On Delivery",
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  // empty cart 
  await Cart.findOneAndRemove({ orderdBy: userId });
}

function generateTrx() {
  return crypto.randomBytes(8).toString("hex");
}
