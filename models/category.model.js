const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: 'Please provide user',
  },
});

module.exports = mongoose.model('Category', CategorySchema);
