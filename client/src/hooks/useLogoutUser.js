import { useAppContext } from '../context/appContext';
import { removeFromLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
const useLogoutUser = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });

    removeFromLocalStorage();
    navigate('/landing');
  };
  return logoutUser;
};

export default useLogoutUser;
