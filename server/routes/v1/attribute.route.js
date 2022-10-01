const router = require("express").Router();

// middlewares
const authorize = require("../../_middleware/authorize");
const Role = require("../../_helpers/role");
const {
  createAttribute,
  getAllAttribute,
  getOneAttribute,
  updateAttribute,
  deleteAttribute,
} = require("../../controllers/attribute.controller");

// routes
router.post("/", authorize(Role.Admin), createAttribute);
router.get("/", getAllAttribute);
router.get("/:id", getOneAttribute);
router.put("/:id", authorize(Role.Admin), updateAttribute);
router.delete("/:id", authorize(Role.Admin), deleteAttribute);

module.exports = router;
