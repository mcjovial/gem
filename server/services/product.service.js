const slugify = require("slugify");
const Product = require("../models/product.model");
const VariationOption = require("../models/variation-option.model");
const Variation = require("../models/variation.model");

module.exports = {
  create,
  listCountProducts,
  removeProduct,
  readProduct,
  updateProduct,
  list,
  listWithPagination,
  productsCount,
  productStar,
  listRelatedProducts,
};

async function create(body) {
  // body.slug = slugify(body.name);
  // return await Product.create(body);

  // console.log(body);
  // const upsert = body.variation_options.upsert
  // console.log(upsert);
  // const options = upsert[0].options
  // console.log(options);
  // let var_opt = [];
  // body.variation_options.upsert.forEach(element => {
  //   let vars = Variation.create({
  //     sku: element.sku,
  //     quantity: element.quantity,
  //     sale_price: element.sale_price,
  //     price: element.price,
  //     is_disable: element.is_disable,
  //     title: element.title,
  //   });
  //   const optns = VariationOption.insertMany(
  //     element.options.map(opt => ({
  //       name: opt.name,
  //       value: opt.value
  //     }))
  //   );
  //   optns.then(res => {
  //     console.log(res);
  //     vars.options = res.map(val => val._id);
  //   })
  //   vars.save();
  //   var_opt.push(vars._id)
  // });

  // console.log(var_opt);

  // const attr = await Attribute.create({
  //   name: body.name,
  //   slug: body.slug,
  // });
  // const values = await AttributeValue.insertMany(
  //   body.values.map((val) => ({
  //     value: val.value,
  //     meta: val.meta,
  //     attribute: attr._id,
  //   }))
  // );
  // attr.values = values.map((val) => val._id);
  // return await attr.save();

  const createObj = {
    ...body,
    variation_options: var_opt,
  };
  const dbProduct = await Product.create({
    ...createObj,
    slug: slugify(body.name),
  });
  return dbProduct;
}

async function listCountProducts(params) {
  return await Product.find({})
    .limit(parseInt(params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]]);
}

async function removeProduct(id) {
  // await checkProduct(params.id);
  // return await Product.findOneAndRemove({
  //   _id: params.id,
  // });
  return await Product.findByIdAndRemove(id, { new: true });
}

async function readProduct(params) {
  await checkProduct(params.slug);
  return await Product.findOne({ slug: params.slug })
    .populate("categories")
    .populate("variation_options")
    .populate("variations")
    .populate("subs")
    .populate("tags");
}

async function updateProduct(body, id) {
  // console.log(body);
  // await checkProduct(slug);
  // if (body.title) {
  //   body.slug = slugify(body.title);
  // }
  // return await Product.findOneAndUpdate({ slug: params.slug }, body, {
  //   new: true,
  // });

  const addVariationObjects = body.variation_options.upsert;
  delete body.variation_options;
  console.log(body);
  return await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        ...body,
        variation_options: addVariationObjects,
      },
    },
    { new: true }
  );
}

// WITHOUT PAGINATION
async function list(query) {
  // createdAt/updatedAt, desc/asc, 3
  const { sort, order, limit, search } = query;
  // return await Product.find({$text: { $search: search }})
  return await Product.find({})
    .populate("category")
    .populate("subs")
    .sort([[sort, order]])
    .limit(limit);
}

// WITH PAGINATION
async function listWithPagination(body) {
  console.log(body);
  // createdAt/updatedAt, desc/asc, 3
  const { sortedBy, orderBy, page, limit } = body;
  // const currentPage = page || 1;
  // const perPage = 3; // 3

  return await Product.find({})
    // .skip((currentPage - 1) * perPage)
    .skip(page * limit)
    .populate("variation_options")
    .populate("categories")
    .populate("variations")
    .populate("subs")
    .populate("tags")
    .sort([[orderBy, sortedBy === "asc" ? 1 : -1]])
    .limit(limit);
}

async function productsCount() {
  return await Product.find({}).estimatedDocumentCount();
}

async function productStar(userId, body, params) {
  const product = await Product.findById(params.productId);
  const { star } = body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === userId.toString()
  );

  // if user haven't left rating yet, push it
  if (!existingRatingObject) {
    return await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: userId } },
      },
      { new: true }
    );
  } else {
    // if user have already left rating, update it
    return await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
  }
}

async function listRelatedProducts(params) {
  await checkProduct(null, params.productId);
  const product = await Product.findById(params.productId);

  return await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs");
  // .populate("postedBy");
}

async function checkProduct(slug, id = null) {
  const product =
    (await Product.findOne({ slug })) || (await Product.findById(id));
  if (!product) throw "Product not found";
  return product;
}
