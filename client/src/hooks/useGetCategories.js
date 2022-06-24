import useAuthFetch from './useAuthFetch';

const { useAppContext } = require('../context/appContext');

const useGetCategories = () => {
  const { dispatch } = useAppContext();
  const authFetch = useAuthFetch();

  const getCategories = async () => {
    try {
      const { data } = await authFetch.get('/category');
      dispatch({
        type: 'SETUP_CATEGORIES',
        payload: {
          categories: data.categories,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return getCategories;
};

export default useGetCategories;
