const express = require('express');
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require('../controllers/category.controller');

router.route('/').get(getAllCategories).post(createCategory);
router.route('/:categoryId').patch(updateCategory).delete(deleteCategory);

module.exports = router;
