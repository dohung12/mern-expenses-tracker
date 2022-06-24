require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ExpenseSchema = require('../models/expense.model');

const createRandomExpense = () => {
  return {
    title: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(['meals', 'groceries', 'commute']),
    amount: faker.finance.amount(),
    incurred_on: faker.date.recent(),
    notes: faker.lorem.words(),
    createdBy: '62b422d5e384f2fc811089e3',
  };
};

const expenseAmount = 10;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (let index = 0; index < expenseAmount; index++) {
      const expense = createRandomExpense();
      await ExpenseSchema.create(expense);
    }

    console.log('Success');
  } catch (error) {
    console.log(error);
  }
};

start();
