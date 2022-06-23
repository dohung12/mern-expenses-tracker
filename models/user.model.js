const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    select: false,
  },
  profilePic: {
    type: String,
    default:
      'https://res.cloudinary.com/dbvndh29t/image/upload/v1654756837/odin-book/profile-silhouette_pxt7tz.jpg',
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
