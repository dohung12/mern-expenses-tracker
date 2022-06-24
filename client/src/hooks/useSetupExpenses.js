import { useAppContext } from '../context/appContext';

const useSetupExpenses = () => {
  const { dispatch } = useAppContext();

  const setupExpenses = ({ expenses, count, numOfPages }) => {
    dispatch({
      type: 'SETUP_EXPENSES',
      payload: {
        expenses,
        count,
        numOfPages,
      },
    });
  };
  return setupExpenses;
};

export default useSetupExpenses;
