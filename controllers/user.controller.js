const UserSchema = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');

const updateProfile = async (req, res) => {
  const { profilePic, email, username } = req.body;
  const { userId } = req.user;
  if (!profilePic || !email || !username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide all values',
    });
  }

  // find User
  const user = await UserSchema.findById(userId);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `User with ID ${userId} doesn't exist`,
    });
  }

  // user found, update
  await user.updateOne(req.body);

  // success, send data back
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    token,
    user,
  });
};

const updatePassword = async (req, res) => {
  const { userId } = req.user;
  const { newPassword, confirmNewPassword } = req.body;

  // find user
  const user = await UserSchema.findById(userId).select('+password');
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `User with ID ${userId} doesn't exist`,
    });
  }

  // check if new password is different to current ones
  const isMatch = await user.comparePassword(newPassword);
  if (isMatch) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'New password must be different from current password',
    });
  }

  // check if  wrong confirm password
  if (newPassword !== confirmNewPassword) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Confirm Password is incorrect',
    });
  }

  // Success, save new password
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({
    msg: `Password Updated`,
  });
};

const removeUser = async (req, res, next) => {
  const { userId } = req.user;

  await UserSchema.findByIdAndRemove(userId);
  res.status(StatusCodes.OK).json({ msg: 'remove user successful' });
};

module.exports = { removeUser, updatePassword, updateProfile };
