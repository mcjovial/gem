const slugify = require("slugify");
const { getSubs } = require("../controllers/category.controller");
const Product = require("../models/product.model");
const Sub = require("../models/sub-category.model");

module.exports = {
  create,
  list,
  read,
  update,
  remove,
};

async function create(body) {
  const { name, parent } = body;
  return await new Sub({ name, parent, slug: slugify(name) }).save();
}

async function list() {
  return await Sub.find({}).sort({ createdAt: -1 });
}

async function read(params) {
  let sub = await getSub(params.slug);
  const products = await Product.find({ subs: sub }).populate("category");

  return {
    sub,
    products,
  };
}

async function update(body, params) {
  await getSub(params.slug);
  const { name, parent } = body;
  return await Sub.findOneAndUpdate(
    { slug: params.slug },
    { name, parent, slug: slugify(name) },
    { new: true }
  );
}

async function remove(params) {
  await getSub(params.slug);
  return await Sub.findOneAndDelete({ slug: params.slug });
}

async function getSub(slug) {
  let sub = await Sub.findOne({ slug });
  if (!sub) throw "Sub category not found";
  return sub;
}
