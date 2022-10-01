const Category = require("../models/category.model");
const Product = require("../models/product.model");
const slugify = require("slugify");

module.exports = {
  create,
  getCategoriesAll,
  getCategories,
  getOne,
  update,
  updateMultiple,
  remove,
};

async function create(body) {
  const { name, description, parent, icon, image } = body;
  const slug = slugify(name);
  const exists = await Category.findOne({ slug });
  if (exists) throw "Category with this name or slug already exists.";
  return await Category.create({
    slug,
    name,
    description,
    parent,
    icon,
    image,
  });
}

async function getCategoriesAll({ limit, page, search }) {
  return await Category.find(search ? { $text: { $search: search } } : {})
    .populate("parent")
    .skip(limit * page)
    .limit(limit);
}

async function getCategories({ limit, page, search, orderBy, sortedBy }) {
  return await Category.find(search ? { $text: { $search: search } } : {})
    .populate("parent")
    .skip(limit * page)
    .sort([[sortedBy, orderBy]])
    .limit(limit);
}

async function getOne(id) {
  await getCategory(null, id);
  return await Category.findById(id).populate([
    "image",
    "parent",
    "children",
    "products",
  ]);
}

async function update(id, body) {
  return await Category.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true }
  );
}

async function updateMultiple(ids, body) {
  return await Category.updateMany(
    { _id: { $in: ids } },
    {
      $set: { body },
    },
    { new: true }
  );
}

async function remove(id) {
  return await Category.findByIdAndRemove(id, { new: true });
}

async function getCategory(slug, id = null) {
  const category =
    (await Category.findOne({ slug })) || (await Category.findById(id));
  if (!category) throw "Category not found";
  return category;
}
