const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  imageId: {
    type: mongoose.Types.ObjectId,
    ref: 'images'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = CommentSchema;
