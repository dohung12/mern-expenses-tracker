import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useAuthFetch, useSetupExpenses } from '../hooks';
import { SingleExpense } from './index';
const ExpensesContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authFetch = useAuthFetch();
  const setupExpenses = useSetupExpenses();
  const { state } = useAppContext();

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.get('/expenses');
      setupExpenses(data.expenses);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      {isLoading && <button aria-busy={true}>Please wait...</button>}
      {state.expenses.length > 0 &&
        state.expenses.map((expense) => {
          return <SingleExpense key={expense._id} {...expense} />;
        })}
    </div>
  );
};

export default ExpensesContainer;
