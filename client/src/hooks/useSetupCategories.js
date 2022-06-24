const { useAppContext } = require('../context/appContext');

const useSetupCategories = () => {
  const { dispatch } = useAppContext();

  const setupCategories = (categories) => {
    dispatch({
      type: 'SETUP_CATEGORIES',
      payload: {
        categories,
      },
    });
  };
  return setupCategories;
};

export default useSetupCategories;
