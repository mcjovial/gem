const router = require("express").Router();
const { searchFilters } = require("../../controllers/search.controller");
const { searchSchema } = require("../../validations/search.validation");

router.post("/filters", searchSchema, searchFilters);

module.exports = router;