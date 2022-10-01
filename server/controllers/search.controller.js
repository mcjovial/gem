const { handleQuery, handlePrice } = require("../services/search.service");

// SEARCH / FILTER
exports.searchFilters = async (req, res, next) => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;

  if (query) {
    handleQuery(query)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  // price [20, 200]
  if (price !== undefined) {
    await handlePrice(price)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (category) {
    await handleCategory(category)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (stars) {
    await handleStar(stars)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (sub) {
    await handleSub(sub)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (shipping) {
    await handleShipping(shipping)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (color) {
    await handleColor(color)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  if (brand) {
    await handleBrand(brand)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }
};
