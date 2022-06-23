const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // save userId to request
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  },
];
