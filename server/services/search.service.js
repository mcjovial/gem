const Product = require("../models/product.model");

exports.handleQuery = async (query) => {
  return await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handlePrice = async (price) => {
  return await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handleCategory = async (category) => {
  return await Product.find({ category })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handleStar = async (stars) => {
  const aggregates = await Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ]).limit(12);

  return await Product.find({ _id: aggregates })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name");
};

exports.handleSub = async (sub) => {
  return await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handleShipping = async (shipping) => {
  return await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handleColor = async (color) => {
  return await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};

exports.handleBrand = async (brand) => {
  return await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("vendor", "_id name")
    .exec();
};
