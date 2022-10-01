const { default: slugify } = require("slugify");
const AttributeValue = require("../models/attribute-value.model");
const Attribute = require("../models/attribute.model");

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};

async function create(body) {
  body.slug = slugify(body.name);
  const attr = await Attribute.create({
    name: body.name,
    slug: body.slug,
  });
  const values = await AttributeValue.insertMany(
    body.values.map((val) => ({
      value: val.value,
      meta: val.meta,
      attribute: attr._id,
    }))
  );
  attr.values = values.map((val) => val._id);
  return await attr.save();
}

async function findAll({ limit, page, orderBy, sortedBy }) {
  return await Attribute.find({})
    .skip(limit * page)
    .populate("values")
    .sort([[sortedBy, orderBy]])
    .limit(limit);
}

async function findOne(id) {
  return await Attribute.findById(id).populate(["values"]);
}

async function update(id, body) {
  const attrList = [];

  for (let i = 0; i < body.values.length; i++) {
    const attr = body.values[i];
    let attrValue;
    if (attr.id) {
      attrValue = await AttributeValue.findByIdAndUpdate(attr.id, {
        $set: { meta: attr.meta, value: attr.value },
      });
    } else {
      attrValue = await AttributeValue.create({
        value: attr.value,
        meta: attr.meta,
        attribute: id,
      });
    }
    attrList.push(attrValue._id);
  }
  return await Attribute.findByIdAndUpdate(
    id,
    {
      $set: {
        name: body.name,
        values: attrList,
      },
    },
    { new: true }
  );
}

async function remove(id) {
  return await Attribute.findByIdAndRemove(id, { new: true });
}
