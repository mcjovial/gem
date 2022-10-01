const productService = require("../services/product.service");

const {
  handleQuery,
  handlePrice,
  handleCategory,
  handleStar,
  handleSub,
  handleShipping,
  handleColor,
  handleBrand,
} = require("../services/search.service");

exports.createProduct = (req, res, next) => {
  productService
    .create(req.body)
    .then(data => res.status(201).json({ ...data, message: "Product created successfully" }))
    .catch(next);
};

exports.listCountProducts = async (req, res, next) => {
  productService
    .listCountProducts(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.removeProduct = async (req, res, next) => {
  productService
    .removeProduct(req.params.id)
    .then((data) =>
      res.status(200).json({ ...data, message: "Product deleted successfully" })
    )
    .catch(next);
};

exports.readProduct = async (req, res, next) => {
  productService
    .readProduct(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.updateProduct = async (req, res, next) => {
  productService
    .updateProduct(req.body, req.params.id)
    .then((data) => res.status(201).json(data))
    .catch(next);
};

exports.list = async (req, res, next) => {
  productService
    .list(req.query)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
exports.listWithPagination = async (req, res, next) => {
  productService
    .listWithPagination(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.productsCount = async (req, res, next) => {
  productService
    .productsCount()
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.productStar = async (req, res, next) => {
  productService
    .productStar(req.user.id, req.body, req.params)
    .then((data) =>
      res
        .status(200)
        .json({ ...data, message: "Product rating submitted successfully" })
    )
    .catch(next);
};

exports.listRelatedProducts = async (req, res, next) => {
  productService
    .listRelatedProducts(req.params)
    .then((data) => res.status(200).json(data))
    .catch(next);
};
