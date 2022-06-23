import { useAppContext } from '../context/appContext';

const useSetupExpenses = () => {
  const { dispatch } = useAppContext();

  const setupExpenses = (expenses) => {
    dispatch({
      type: 'SETUP_EXPENSES',
      payload: {
        expenses,
      },
    });
  };
  return setupExpenses;
};

export default useSetupExpenses;
