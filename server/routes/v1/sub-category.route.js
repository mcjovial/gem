const router = require("express").Router();
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../../controllers/sub-category.controller");
const { createSubCategorySchema } = require("../../validations/sub-category.validation");

const Role = require("../../_helpers/role");
const authorize = require("../../_middleware/authorize");

router.post("/", authorize(Role.Admin), createSubCategorySchema, create);
router.get("/", list);
router.get("/:slug", read);
router.put("/:slug", authorize(Role.Admin), update);
router.delete("/:slug", authorize(Role.Admin), remove);

module.exports = router;
