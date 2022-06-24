const CategorySchema = require('../models/category.model');
const { StatusCodes } = require('http-status-codes');
const checkPermission = require('../utils/checkPermission');

const createCategory = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: 'Please provide all values',
    });
  }

  // CHECK FOR UNIQUE
  const isTitleBeingUsed = await CategorySchema.findOne({ title });
  if (isTitleBeingUsed) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Already has category with the same name.',
    });
  }

  req.body.createdBy = req.user.userId;
  const category = await CategorySchema.create(req.body);
  res.status(StatusCodes.CREATED).json({
    category,
  });
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;

  const { title } = req.body;
  if (!title) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'Please provide all values',
    });
  }
  // find category
  const category = await CategorySchema.findById(categoryId);
  if (!category) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Category with ID ${categoryId} doesn't exist`,
    });
  }

  // check permission to update category
  const permission = checkPermission(req.user.userId, category.createdBy);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
  // success, update category
  await category.updateOne(req.body);
  res.status(StatusCodes.OK).json({
    category,
  });
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  // find category
  const category = await CategorySchema.findById(categoryId);
  if (!category) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: `Category with ID ${categoryId} doesn't exist`,
    });
  }

  // check permission to update category
  const permission = checkPermission(req.user.userId, category.createdBy);
  if (!permission) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: 'Not authorized to access this route',
    });
  }
  // success, remove category
  await category.remove();
  res.status(StatusCodes.OK).json({
    msg: 'successful remove category',
  });
};

const getAllCategories = async (req, res) => {
  const categories = await CategorySchema.find({
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.OK).json({
    count: categories.length,
    categories,
  });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
