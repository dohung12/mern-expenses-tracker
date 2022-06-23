import { useAppContext } from '../context/appContext';

const useToggleSidebar = () => {
  const { dispatch } = useAppContext();

  const toggleSidebar = () => {
    dispatch({
      type: 'TOGGLE_SIDEBAR',
    });
  };
  return toggleSidebar;
};

export default useToggleSidebar;
