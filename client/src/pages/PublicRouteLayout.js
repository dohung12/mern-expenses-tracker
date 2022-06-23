import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/';

const PublicRouteLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
};

export default PublicRouteLayout;
