import { useAppContext } from '../context/appContext';
import { addToLocalStorage } from '../utils/localStorage';
const useSetupUser = () => {
  const { dispatch } = useAppContext();

  const setupUser = ({ user, token }) => {
    dispatch({
      type: 'SETUP_USER',
      payload: {
        user,
        token,
      },
    });
    // save data to local storage
    addToLocalStorage(user, token);
  };

  return setupUser;
};

export default useSetupUser;
