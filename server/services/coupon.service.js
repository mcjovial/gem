const Coupon = require("../models/coupon.model");

module.exports = {
  create,
  getAll,
  getOne,
  verify,
  update,
  remove
};


async function create(body) {
  return await Coupon.create(body);
}

async function getAll({ search, limit, page, orderBy, sortedBy }) {
  return await Coupon.find(search ? { $text: { $search: search } } : {})
    // .populate("orders")
    .skip(limit * page)
    .sort([[sortedBy, orderBy]])
    .limit(limit);
}

async function getOne(id) {
  return Coupon.findById(id);
}

async function verify(body) {
  const coupon = await Coupon.findOne({
    code: body.code
  });
  if (!coupon) throw "Coupon not found.";

  return {
    coupon,
    is_valid: new Date(coupon.expire_at).getTime() > new Date().getTime(),
  };
}

async function update(id, body) {
  return await Coupon.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true },
  );
}

async function remove(id) {
  return await Coupon.findByIdAndRemove(id, { new: true });
}
