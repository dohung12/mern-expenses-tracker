import useAuthFetch from './useAuthFetch';
import useSetupExpenses from './useSetupExpenses';

const useGetExpenses = () => {
  const authFetch = useAuthFetch();
  const setupExpenses = useSetupExpenses();

  const getExpenses = async (url = '') => {
    // if search query is given, fetch that url
    // else search by default
    try {
      const { data } = url
        ? await authFetch.get(url)
        : await authFetch.get('/expenses');
      const { expenses, count, numOfPages } = data;
      setupExpenses({ expenses, count, numOfPages });
    } catch (error) {
      console.log(error);
    }
  };

  return getExpenses;
};

export default useGetExpenses;
