import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const PrivateRouteProtector = ({ children }) => {
  const { state } = useAppContext();

  if (!state.user) {
    return <Navigate to={'/landing'} />;
  }

  return children;
};

export default PrivateRouteProtector;
