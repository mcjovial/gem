const cloudinary = require("cloudinary");
const cloudinaryService = require("../services/cloudinary.service");

// // config
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,

// req.files.file.path
exports.upload = (req, res, next) => {
  cloudinaryService.upload(req.body).then((data) => res.json(data)).catch(next)
};

exports.remove = (req, res, next) => {
  cloudinaryService.remove(req.body).then((data) => res.json(data)).catch(next)
};
