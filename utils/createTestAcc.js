const { faker } = require('@faker-js/faker');
const UserSchema = require('../models/user.model');
const ExpenseSchema = require('../models/expense.model');
const CategorySchema = require('../models/category.model');

// CREATE CATEGORY
const createCategory = async (userId) => {
  const CATEGORY = [
    'Savings',
    'Renting',
    'Transportation',
    'Groceries',
    'Utilities',
    'Health Care',
    'Clothing, Apparel, and Accessories',
    'Entertainment',
    'Personal Products',
  ];
  const categoriesId = [];
  for (const element of CATEGORY) {
    const result = await CategorySchema.create({
      title: element,
      createdBy: userId,
    });
    categoriesId.push(result._id);
  }
  return categoriesId;
};

const createRandomExpense = (categoryId, userId, boundary) => {
  return {
    title: faker.random.words(),
    category: faker.helpers.arrayElement(categoryId),
    amount: faker.finance.amount(),
    incurred_on: boundary === 'past' ? faker.date.past() : faker.date.recent(),
    notes: faker.random.words(),
    createdBy: userId,
  };
};

const createRandomUserAcc = async (req, res) => {
  // create random user
  const userData = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePic: faker.internet.avatar(),
  };
  const user = await UserSchema.create(userData);
  const token = user.createJWT();

  // create category
  const categoryId = await createCategory(user._id);

  // create random expenses
  const recentExpensesAmount = 20;
  for (let idx = 0; idx < recentExpensesAmount; idx++) {
    const result = createRandomExpense(categoryId, user._id, 'recent');
    await ExpenseSchema.create(result);
  }
  const pastExpensesAmount = 50;
  for (let idx = 0; idx < pastExpensesAmount; idx++) {
    const result = createRandomExpense(categoryId, user._id, 'past');
    await ExpenseSchema.create(result);
  }

  return res.status(200).json({
    user,
    token,
  });
};
module.exports = createRandomUserAcc;
