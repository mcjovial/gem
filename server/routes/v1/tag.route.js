const router = require("express").Router();

// middlewares
const authorize = require("../../_middleware/authorize");
const Role = require("../../_helpers/role");
const {
  createTag,
  getAllTags,
  getOneTag,
  updateTag,
  deleteTag,
} = require("../../controllers/tag.controller");

// routes
router.post("/", authorize(Role.Admin), createTag);
router.get("/", getAllTags);
router.get("/:id", getOneTag);
router.put("/:id", authorize(Role.Admin), updateTag);
router.delete("/:id", authorize(Role.Admin), deleteTag);

module.exports = router;
