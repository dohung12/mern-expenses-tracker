const ExpenseSchema = require('../models/expense.model');
const { StatusCodes } = require('http-status-codes');
const checkPermission = require('../utils/checkPermission');

const getSingleExpense = async (req, res) => {
  const { expenseId } = req.params;

  // FIND EXPENSE
  const expense = await ExpenseSchema.findById(expenseId);
  if (!expense) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Expense with ID ${expenseId} doesn't exist`,
    });
  }
  res.status(StatusCodes.OK).json({ expense });
};

const getAllExpense = async (req, res) => {
  res.send('get all expenses');
};

const createExpense = async (req, res) => {
  const { userId } = req.user;
  const { title, category, amount } = req.body;

  if (!title || !category || !amount) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }

  req.body.createdBy = userId;
  const expense = await ExpenseSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({
    expense,
  });
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;

  const { title, category, amount } = req.body;
  if (!title || !category || !amount) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide all values',
    });
  }
  // find expense
  const expense = await ExpenseSchema.findById(expenseId);
  if (!expense) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Expense with ID ${expenseId} doesn't exist`,
    });
  }

  // check permission to update expense
  const permission = checkPermission(req.user.userId, expense.createdBy);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
  // success, update expense
  await expense.updateOne(req.body);

  res.status(StatusCodes.OK).json({
    expense,
  });
};

const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  // find expense
  const expense = await ExpenseSchema.findById(expenseId);
  if (!expense) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Expense with ID ${expenseId} doesn't exist`,
    });
  }

  // check permission to remove expense
  const permission = checkPermission(req.user.userId, expense.createdBy);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
  // success, update expense
  await expense.remove();

  res.status(StatusCodes.OK).json({
    msg: 'successful remove expense',
  });
};

module.exports = {
  getSingleExpense,
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
