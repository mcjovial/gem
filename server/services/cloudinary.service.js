const { cloudinary } = require("../_helpers/cloudinary");

// req.files.file.path
async function upload(body) {
  let result = await cloudinary.uploader.upload(body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });
  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
}

function remove(body) {
  let image_id = body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) throw err;
    return result;
  });
}

module.exports = {
  upload,
  remove
}