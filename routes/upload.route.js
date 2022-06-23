const express = require('express');
const router = express.Router();

const { uploadImage } = require('../controllers/upload.controller');

router.route('/').post(uploadImage);

module.exports = router;
