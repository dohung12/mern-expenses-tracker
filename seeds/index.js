require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const ExpenseSchema = require('../models/expense.model');
const CategorySchema = require('../models/category.model');

// const categoryId = [
//   new ObjectId('62b53481d55cd656f0d87de7'),
//   new ObjectId('62b53482d55cd656f0d87de9'),
//   new ObjectId('62b53482d55cd656f0d87deb'),
//   new ObjectId('62b53482d55cd656f0d87ded'),
//   new ObjectId('62b53482d55cd656f0d87def'),
//   new ObjectId('62b53482d55cd656f0d87df1'),
//   new ObjectId('62b53482d55cd656f0d87df3'),
//   new ObjectId('62b53482d55cd656f0d87df5'),
//   new ObjectId('62b53482d55cd656f0d87df7'),
// ];

const categoryId = [
  '62b53481d55cd656f0d87de7',
  '62b53482d55cd656f0d87de9',
  '62b53482d55cd656f0d87deb',
  '62b53482d55cd656f0d87ded',
  '62b53482d55cd656f0d87def',
  '62b53482d55cd656f0d87df1',
  '62b53482d55cd656f0d87df3',
  '62b53482d55cd656f0d87df5',
  '62b53482d55cd656f0d87df7',
];

const createRandomExpense = () => {
  return {
    title: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(categoryId),
    amount: faker.finance.amount(),
    incurred_on: faker.date.past(),
    notes: faker.lorem.words(),
    createdBy: '62b422d5e384f2fc811089e3',
  };
};

// const createDbData = async () => {
//   const expenseAmount = 10;
//   for (let index = 0; index < expenseAmount; index++) {
//     const expense = createRandomExpense();
//     await ExpenseSchema.create(expense);
//   }
// };

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await ExpenseSchema.deleteMany();
    const expenseAmount = 10;
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
