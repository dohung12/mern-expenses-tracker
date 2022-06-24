import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useGetCategories, useGetExpenses } from '../hooks';
import { SingleExpense } from './index';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const ExpensesContainer = () => {
  const { state } = useAppContext();

  const getExpenses = useGetExpenses();
  const getCategories = useGetCategories();

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  return (
    <Wrapper>
      {state.expenses.length === 0 && <h1>No expenses to display</h1>}
      {state.expenses.length > 0 &&
        state.expenses.map((expense) => {
          return <SingleExpense key={expense._id} {...expense} />;
        })}
    </Wrapper>
  );
};

export default ExpensesContainer;
