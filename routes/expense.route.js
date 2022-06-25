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

// STATS ROUTE
router.route('/stats').get(showStats);
router.route('/stats/category').get(expensesPerCategory);

router
  .route('/:expenseId')
  .get(getSingleExpense)
  .patch(updateExpense)
  .delete(deleteExpense);

module.exports = router;
