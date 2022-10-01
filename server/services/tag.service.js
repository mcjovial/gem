const { default: slugify } = require("slugify");
const Tag = require("../models/tag.model");

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove
}

async function create(body) {
  console.log(body);
  return await Tag.create({
    ...body,
    slug: slugify(body.name),
  });
}

async function findAll({ page, limit, orderBy, sortedBy, search }) {
  return await Tag.find(search ? { $text: { $search: search } } : {})
  .populate("products")
  .skip(limit * page)
  .sort([[sortedBy, orderBy]])
  .limit(limit);
}

async function findOne(id) {
  return await Tag.findById(id).populate(['products']);
}

async function update(id, body) {
  return await Tag.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true },
  );
}

async function remove(id) {
  return await Tag.findByIdAndRemove(id, { new: true });
}
