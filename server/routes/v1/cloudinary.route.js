const express = require("express");
const router = express.Router();


const authorize = require("../../_middleware/authorize");
const Role = require("../../_helpers/role");
const { upload, remove } = require("../../controllers/cloudinary.controller");


router.post("/uploadimages", authorize(Role.Admin), upload);
router.post("/removeimage", authorize(Role.Admin), remove);

module.exports = router;