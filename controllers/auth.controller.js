const UserSchema = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
// const createUserData = require('../seeds/createTestAcc2');

const login = async (req, res) => {
  const { email, password } = req.body;

  // find if user exist
  const user = await UserSchema.findOne({ email }).select('+password');
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Incorrect email',
    });
  }

  // check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Incorrect password',
    });
  }

  // success, send result back
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    success: true,
    user,
    token,
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  // check if input value is empty
  if (!username || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }

  // check if email already in use.
  const userAlreadyExist = await UserSchema.findOne({ email });
  if (userAlreadyExist) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Email already in use',
    });
  }

  // create new user from input values
  const user = await UserSchema.create({ username, email, password });
  user.password = undefined;
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    success: true,
    user,
    token,
  });
};

// const createTestAcc = async (req, res, next) => {
//   const user = await createUserData();
//   const token = user.createJWT();
//   res.status(StatusCodes.CREATED).json({
//     success: true,
//     user,
//     token,
//   });
// };

module.exports = { login, register };
