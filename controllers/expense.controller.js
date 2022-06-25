const ExpenseSchema = require('../models/expense.model');
const CategorySchema = require('../models/category.model');
const { StatusCodes } = require('http-status-codes');
const checkPermission = require('../utils/checkPermission');
const mongoose = require('mongoose');

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
  const {
    title,
    category,
    incurred_on_from,
    incurred_on_to,
    amount_from,
    amount_to,
    sort,
  } = req.query;

  const queryObj = { createdBy: req.user.userId };

  // get category id

  if (category && category !== 'all') {
    const result = await CategorySchema.findOne({ title: category });
    queryObj.category = result;
  }
  if (amount_from) {
    queryObj.amount = {
      $gte: amount_from,
    };
  }
  if (amount_to) {
    queryObj.amount = {
      $lte: amount_to,
    };
  }
  if (amount_from && amount_to) {
    queryObj.amount = {
      $gte: amount_from,
      $lte: amount_to,
    };
  }
  if (incurred_on_from) {
    queryObj.incurred_on = {
      $gte: incurred_on_from,
    };
  }
  if (incurred_on_to) {
    queryObj.incurred_on = {
      $lte: incurred_on_to,
    };
  }
  if (incurred_on_from && incurred_on_to) {
    queryObj.incurred_on = {
      $gte: incurred_on_from,
      $lte: incurred_on_to,
    };
  }
  if (title) {
    queryObj.title = {
      $regex: title,
      $options: 'i',
    };
  }

  // // get result from db
  let result = ExpenseSchema.find(queryObj).populate('category');

  // sort return values based on options
  switch (sort) {
    case 'latest':
      result = result.sort('-createdAt');
      break;
    case 'oldest':
      result = result.sort('createdAt');
      break;
    case 'a-z':
      result = result.sort('title');
      break;
    case 'z-a':
      result = result.sort('-title');
      break;
    case 'amount: low to high':
      result = result.sort('amount');
      break;
    case 'amount: high to low':
      result = result.sort('-amount');
      break;
    default:
      result = result.sort('-createdAt');
      break;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 15;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const expenses = await result;
  const totalExpenses = await ExpenseSchema.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalExpenses / limit);

  res.status(StatusCodes.OK).json({
    count: totalExpenses,
    expenses,
    numOfPages,
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

const showStats = async (req, res) => {
  let categoriesSpending = await ExpenseSchema.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$category', count: { $sum: '$amount' } } },
  ]);

  let monthlySpending = await ExpenseSchema.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$incurred_on' },
          month: { $month: '$incurred_on' },
          // date: { $dayOfMonth: '$incurred_on' },
        },
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
  ]);

  // THIS MONTH, SORT BASED ON CATEGORY
  let categoryMonthlyAvg = await ExpenseSchema.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { category: '$category', month: { $month: '$incurred_on' } },
        totalSpent: { $sum: '$amount' },
      },
    },
    { $group: { _id: '$_id.category', avgSpent: { $avg: '$totalSpent' } } },
  ]);

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  let thisMonthTotal = await ExpenseSchema.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
        incurred_on: { $gte: firstDay, $lte: lastDay },
      },
    },
    { $group: { _id: '$category', totalSpent: { $sum: '$amount' } } },
    {
      $project: {
        _id: '$_id',
        value: { total: '$totalSpent' },
      },
    },
  ]);

  res.json({ categoryMonthlyAvg, thisMonthTotal });
};

module.exports = {
  getSingleExpense,
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  showStats,
};
