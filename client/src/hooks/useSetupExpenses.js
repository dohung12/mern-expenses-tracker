import { useAppContext } from '../context/appContext';

const useSetupExpenses = () => {
  const { dispatch } = useAppContext();

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
  return setupExpenses;
};

export default useSetupExpenses;
