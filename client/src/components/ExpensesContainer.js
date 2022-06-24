import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { SingleExpense } from './index';
import { useGetCategories, useGetExpenses } from '../hooks';
import Wrapper from '../assets/Wrapper/ExpensesContainerWrapper';

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
      {state.count === 0 && <h1>No expenses to display</h1>}
      <Wrapper>
        <h4>
          {state.count} Expense{state.count > 1 ? 's' : ''} Found
        </h4>
        {state.count > 0 &&
          state.expenses.map((expense) => {
            return <SingleExpense key={expense._id} {...expense} />;
          })}
      </Wrapper>
    </>
  );
};

export default ExpensesContainer;
