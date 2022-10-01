const authorize = require('../../_middleware/authorize')
const Role = require("_helpers/role");
const { createOrUpdate, getSettings } = require('../../controllers/settings.controller');

const router = require('express').Router()

router.post("/", authorize(Role.Admin), createOrUpdate)
router.get("/", getSettings)

module.exports = router