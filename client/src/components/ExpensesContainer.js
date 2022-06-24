import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useGetCategories, useGetExpenses } from '../hooks';
import { SingleExpense } from './index';

const ExpensesContainer = () => {
  const { state } = useAppContext();

  const getExpenses = useGetExpenses();
  const getCategories = useGetCategories();

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  return (
    <>
      {state.expenses.length === 0 && <h1>No expenses to display</h1>}
      {state.expenses.length > 0 &&
        state.expenses.map((expense) => {
          return <SingleExpense key={expense._id} {...expense} />;
        })}
    </>
  );
};

export default ExpensesContainer;
