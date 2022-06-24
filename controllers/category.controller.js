const CategorySchema = require('../models/category.model');
const { StatusCodes } = require('http-status-codes');

const createCategory = async (req, res) => {
  res.send('create category');
};

const updateCategory = async (req, res) => {
  res.send('update category');
};

const deleteCategory = async (req, res) => {
  res.send('delete category');
};

const getAllCategories = async (req, res) => {
  res.send('get all categories');
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
