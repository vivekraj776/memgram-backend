const AWS = require('aws-sdk');
const fs = require('fs');

const BUCKET_NAME = 'meme-gram';
const IAM_USER_KEY = '';
const IAM_USER_SECRET = '';
const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
});

exports.uploadToS3 = async (file) => {
  const img = fs.readFileSync(file.path);
  const encodeImage = img.toString('base64');

  const params = {
    Bucket: BUCKET_NAME,
    Key: Date.now() + file.originalname,
    // eslint-disable-next-line new-cap
    Body: new Buffer.from(encodeImage, 'base64')
  };
  try {
    const stored = await s3bucket.upload(params).promise();
    return stored;
  } catch (err) {
    return err;
  }
};


exports.deleteImageFromS3 = async (fileName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };
  try {
    const deletedData = await s3bucket.deleteObject(params).promise();
    return deletedData;
  } catch (error) {
    return error;
  }
};
