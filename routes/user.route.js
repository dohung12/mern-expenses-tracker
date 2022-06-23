const express = require('express');
const router = express.Router();
const {
  removeUser,
  updatePassword,
  updateProfile,
} = require('../controllers/user.controller');

router.route('/').delete(removeUser);
router.route('/profile').patch(updateProfile);
router.route('/password').patch(updatePassword);

module.exports = router;
