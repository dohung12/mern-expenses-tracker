const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: 'Title is required',
    },
    category: {
      type: String,
      trim: true,
      required: 'Category is required',
    },
    amount: {
      type: Number,
      min: 0,
      required: 'Amount is required',
    },
    incurred_on: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: 'Please provide user',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', ExpenseSchema);
