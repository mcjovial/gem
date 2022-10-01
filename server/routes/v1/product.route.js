const router = require("express").Router();
const {
  createProduct,
  productsCount,
  removeProduct,
  readProduct,
  updateProduct,
  listWithPagination,
  productStar,
  listRelatedProducts,
  listCountProducts,
  list,
} = require("../../controllers/product.controller");
const { createProductSchema, updateProductSchema } = require("../../validations/product.validation");
const Role = require("../../_helpers/role");
const authorize = require("../../_middleware/authorize");

router.post("/", authorize(Role.Admin), createProduct);
router.get("/", listWithPagination);
router.get("/:slug", readProduct);
router.put("/:id", authorize(Role.Admin), updateProduct);
router.delete("/:id", authorize(Role.Admin), removeProduct);

// router.post("/create", authorize(Role.Admin), createProductSchema, createProduct);
// router.get("/total", productsCount);
// router.get("/count/:count", listCountProducts); // products/100
// router.get("/:slug", readProduct);
// router.put("/:slug", authorize(Role.Admin), updateProductSchema, updateProduct);
// router.get("/", list);
// router.post("/", listWithPagination);
// router.put("/star/:productId", authorize(), productStar);
// router.get("/related/:productId", listRelatedProducts);
// router.delete("/:slug", authorize(Role.Admin), removeProduct);

module.exports = router;
