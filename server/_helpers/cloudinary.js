const cloudinary = require('cloudinary').v2;
const config = require("config.json");
const { cloud_name, api_key, api_secret } = config.cloudinary;

// config
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

module.exports = { cloudinary };
