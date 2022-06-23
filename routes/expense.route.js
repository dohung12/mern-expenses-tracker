const express = require('express');
const router = express.Router();
const {
  getSingleExpense,
  getAllExpense,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expense.controller');

router.route('/').get(getAllExpense).post(createExpense);
router
  .route('/:expenseId')
  .get(getSingleExpense)
  .patch(updateExpense)
  .delete(deleteExpense);

module.exports = router;
