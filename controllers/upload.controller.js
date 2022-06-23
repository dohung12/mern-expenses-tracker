const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'odin-book',
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({
    img: {
      src: result.secure_url,
    },
  });
};

module.exports = { uploadImage };
