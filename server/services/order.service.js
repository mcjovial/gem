const uniqueid = require("uniqueid");
const crypto = require("crypto");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const OrderStatus = require("../models/orderStatus.model");

module.exports = {
  createOrder,
  orders,
  getOrders,
  createCashOrder,
  getOne,
  updateStatus,
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
  const { page, limit, orderBy, sortedBy } = query;
  const currentPage = page || 1;

  // return await Product.find({$text: { $search: search }})
  return await Order.find({})
    .skip((currentPage - 1) * limit)
    .populate("products.product")
    .populate("orderedBy")
    // .populate("vendor")
    // .populate("courier")
    .sort([[orderBy, sortedBy]])
    .limit(limit);
}

async function getOne(id) {
  return await Order.findById(id)
    .populate("products.product")
    .populate("orderedBy");
}

async function updateStatus(id, status) {
  if (status) {
    const statusc = await OrderStatus.findById(status);
    if (!statusc) throw "Invalid Status"

    // const statuses = await OrderStatus.findById(status);
    // const finalStatus = Math.max(...statuses.map((stat) => stat.serial));
    // if (
    //   !statuses?.find((stat) => stat.serial === finalStatus)?._id.equals(status)
    // )
    //   throw "Invalid status";
    // const order = await Order.findById(id);
    // await this.notificationServices.create({
    //   description:
    //     'Your order status has been updated to ' +
    //     statuses.find((stat) => {
    //       console.log(stat, updateOrderInput.status);
    //       return stat._id.equals(updateOrderInput.status);
    //     })?.name,
    //   notification_type: NotifcationType.ORDER,
    //   user: order?.customer,
    //   order_id: order?._id,
    //   title: 'Order Status Updated',
    //   unread: true,
    // });
  }
  return await Order.findByIdAndUpdate(
    id,
    {
      $set: { status },
    },
    { new: true }
  );
}

async function createCashOrder(userId, params) {
  const { COD, couponApplied, delivery_address } = params;
  // if COD is true, create order with status of Cash On Delivery
  if (!COD) throw "Create cash order failed";

  const status = await OrderStatus.findOne({
    serial: 1,
  });

  if (!status) {
    throw "Initial order status not found.";
  }

  let userCart = await Cart.findOne({ orderdBy: userId });

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount;
  } else {
    finalAmount = userCart.cartTotal;
  }

  await new Order({
    tracking_number: generateTrx(),
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd", // TODO: dynamical insert from site settings
      // status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    amount: userCart.cartTotal,
    discount: userCart.cartTotal - finalAmount,
    total: finalAmount,
    coupon: userCart.coupon,
    orderedBy: userId,
    status: status,
    delivery_address
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

async function remove(id) {
  return await Order.findByIdAndRemove(id, { new: true });
}

function generateTrx() {
  return crypto.randomBytes(8).toString("hex");
}
