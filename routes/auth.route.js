const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');
const createRandomUserAcc = require('../utils/createTestAcc');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/test').post(createRandomUserAcc);

module.exports = router;
