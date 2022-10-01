const router = require("express").Router();
const {
  createCategory,
  findAllCategories,
  findAllNewCategories,
  getOneCategory,
  updateOneCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const { createCategorySchema, updateCategorySchema } = require("../../validations/category.validation");
const Role = require("../../_helpers/role");
const authorize = require("../../_middleware/authorize");

router.post("/", authorize(Role.Admin), createCategory);
router.get("/", findAllCategories);
router.get("/all", findAllNewCategories);
router.get("/:id", getOneCategory);
router.put("/:id", authorize(Role.Admin), updateOneCategory);
router.delete("/:id", authorize(Role.Admin), deleteCategory);

module.exports = router;
