import { useAppContext } from '../context/appContext';
import useAuthFetch from './useAuthFetch';

const useGetExpenses = () => {
  const { dispatch } = useAppContext();
  const authFetch = useAuthFetch();

  const setupExpenses = ({ expenses, count, numOfPages, totalAmount }) => {
    dispatch({
      type: 'SETUP_EXPENSES',
      payload: {
        expenses,
        count,
        numOfPages,
        totalAmount,
      },
    });
  };

  const getExpenses = async (url = '') => {
    // if search query is given, fetch that url
    // else search by default
    try {
      const { data } = url
        ? await authFetch.get(url)
        : await authFetch.get('/expenses');
      const { expenses, count, numOfPages, totalAmount } = data;
      setupExpenses({ expenses, count, numOfPages, totalAmount });
    } catch (error) {
      console.log(error);
    }
  };

  return getExpenses;
};

export default useGetExpenses;
