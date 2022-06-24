const ExpenseSchema = require('../models/expense.model');
const CategorySchema = require('../models/category.model');
const { StatusCodes } = require('http-status-codes');
const checkPermission = require('../utils/checkPermission');

const getSingleExpense = async (req, res) => {
  const { expenseId } = req.params;

  // FIND EXPENSE
  const expense = await ExpenseSchema.findById(expenseId).populate('category');
  if (!expense) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Expense with ID ${expenseId} doesn't exist`,
    });
  }
  res.status(StatusCodes.OK).json({ expense });
};

const getAllExpense = async (req, res) => {
  const { userId } = req.user;

  const expenses = await ExpenseSchema.find({ createdBy: userId }).populate(
    'category'
  );
  res.status(StatusCodes.OK).json({
    count: expenses.length,
    expenses,
  });
};

const createExpense = async (req, res) => {
  const { userId } = req.user;
  const { title, amount } = req.body;

  if (!title || !amount || !req.body.category) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }

  const category = await CategorySchema.findOne({ title: req.body.category });
  if (!category) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Category with title ${req.body.category} doesn't exist`,
    });
  }

  req.body.category = category._id;
  req.body.createdBy = userId;
  const expense = await ExpenseSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({
    expense,
  });
};

const updateExpense = async (req, res) => {
  const { expenseId } = req.params;

  const { title, amount } = req.body;
  if (!title || !req.body.category || !amount) {
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
  // find category
  const category = await CategorySchema.findOne({ title: req.body.category });
  if (!category) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Category with title ${req.body.category} doesn't exist`,
    });
  }
  req.body.category = category._id;

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
  // success, delete expense
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
