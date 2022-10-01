const wishlistService = require("../services/wishlist.service");

exports.addToWishlist = async (req, res, next) => {
  wishlistService
    .addToWishlist(req.user.id, req.body)
    .then(data => res.status(201).json({ ...data, message: "Product added to wishlist" }))
    .catch(next);
};

exports.getWishlist = async (req, res, next) => {
  wishlistService
    .getWishlist(req.user.id)
    .then((data) => res.status(200).json(data))
    .catch(next);
};

exports.removeFromWishlist = async (req, res, next) => {
  wishlistService
    .removeFromWishlist(req.user.id, req.params)
    .then((data) =>
      res.status(201).json({ ...data, message: "Product removed to wishlist" })
    )
    .catch(next);
};
