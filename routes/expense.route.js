const express = require('express');
const router = express.Router();
const {
  getSingleExpense,
  getAllExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  showStats,
  expensesPerCategory,
} = require('../controllers/expense.controller');

router.route('/').get(getAllExpense).post(createExpense);
router
  .route('/:expenseId')
  .get(getSingleExpense)
  .patch(updateExpense)
  .delete(deleteExpense);

// STATS ROUTE
router.route('/stats').get(showStats);
router.route('/stats/category').get(expensesPerCategory);

module.exports = router;
