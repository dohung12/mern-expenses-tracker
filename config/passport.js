const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserSchema = require('../models/user.model');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    expiresIn: process.env.JWT_LIFETIME,
  },
};
const verify = async (payload, done) => {
  try {
    const user = await UserSchema.findOne({ _id: payload.userId });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
};

const strategy = new JwtStrategy(options, verify);

module.exports = (passport) => {
  passport.use(strategy);
};
