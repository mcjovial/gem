const express = require("express");
const { swaggerDocs } = require("../../_helpers/swagger");
const accountsRoute = require("./accounts.route");
const adminRoute = require("./admin.route");
const analyticsRoute = require("./analytics.route");
const attributesRoute = require("./attribute.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");
const wishlistRoute = require("./wishlist.route");
const couponRoute = require("./coupon.route");
const categoryRoute = require("./category.route");
const subCategoryRoute = require("./sub-category.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");
const cloudinaryRoute = require("./cloudinary.route");
const settingsRoute = require("./settings.route");
const tagsRoute = require("./tag.route");

const router = express.Router();

router.use("/accounts", accountsRoute);
router.use("/admin", adminRoute);
router.use("/analytics", analyticsRoute);
router.use("/attributes", attributesRoute);
router.use("/cart", cartRoute);
router.use("/orders", orderRoute);
router.use("/wishlist", wishlistRoute);
router.use("/coupon", couponRoute);
router.use("/categories", categoryRoute);
router.use("/sub-category", subCategoryRoute);
router.use("/products", productRoute);
router.use("/search", searchRoute);
router.use("/cloudinary", cloudinaryRoute);
router.use("/settings", settingsRoute);
router.use("/tags", tagsRoute);
router.use("/api-docs", require("_helpers/swagger"));

module.exports = router;
