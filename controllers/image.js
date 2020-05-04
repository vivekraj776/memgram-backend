const fs = require('fs');

const Image = require('../models/Image');
const { uploadToS3 } = require('../helpers/s3-upload.js');
const { deleteImageFromS3 } = require('../helpers/s3-upload');

exports.getImages = async (req, res, next) => {
  try {
    const result = await Image.find();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.insertImage = async (req, res, next) => {
  try {
    const imageUrl = await uploadToS3(req.file);
    if (imageUrl.message) {
      res.status(400).send('Something went Wrong');
    }
    const image = await Image.findOneOrCreateOrUpdate({ imageUrl: imageUrl.Location, id: '5ea7e0ad4be031014cd55a81' });
    fs.unlinkSync(req.file.path);
    res.status(200).send(image);
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const imageUrl = await deleteImageFromS3(req.body.imageUrl);
    res.status(200).send(imageUrl);
  } catch (error) {
    next(error);
  }
};
