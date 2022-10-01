const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../../controllers/wishlist.controller");
const { addWishlistSchema } = require("../../validations/wishlist.validation");
const authorize = require("../../_middleware/authorize");

const router = require("express").Router();

router.post("/", authorize(), addWishlistSchema, addToWishlist);
router.get("/", authorize(), getWishlist);
router.put("/:productId", authorize(), removeFromWishlist);

module.exports = router;
