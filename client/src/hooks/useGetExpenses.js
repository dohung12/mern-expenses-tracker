import useAuthFetch from './useAuthFetch';
import useSetupExpenses from './useSetupExpenses';

const useGetExpenses = () => {
  const authFetch = useAuthFetch();
  const setupExpenses = useSetupExpenses();

  const getExpenses = async () => {
    try {
      const { data } = await authFetch.get('/expenses');
      setupExpenses(data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  return getExpenses;
};

export default useGetExpenses;
