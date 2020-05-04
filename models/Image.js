const mongoose = require('mongoose');

const ImageModal = new mongoose.Schema({
  imageUrl: [{
    type: String,
  }],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

ImageModal.statics.findOneOrCreateOrUpdate = function findOneOrCreate(condition) {
  return new Promise((resolve) => {
    const self = this;
    self.findOne({ userId: condition.id }).then((result) => {
      // eslint-disable-next-line max-len
      const newResult = result ? self.update({ userId: condition.id }, { $push: { imageUrl: condition.imageUrl } }) : self.create(condition);
      resolve(newResult);
    },);
    // eslint-disable-next-line max-len
  });
};

const Image = mongoose.model('Image', ImageModal);

module.exports = Image;
