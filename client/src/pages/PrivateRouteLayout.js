import { Outlet } from 'react-router-dom';
import { PrivateNavbar, Sidebar, SmallSidebar } from '../components/index';
import Wrapper from '../assets/Wrapper/PrivateRouteLayoutWrapper';

const PrivateRouteLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <Sidebar />
        <SmallSidebar />
        <div>
          <PrivateNavbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default PrivateRouteLayout;
