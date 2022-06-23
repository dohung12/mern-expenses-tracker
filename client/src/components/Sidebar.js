import { useAppContext } from '../context/appContext';
import { useToggleSidebar } from '../hooks/index';

import Wrapper from '../assets/Wrapper/SidebarWrapper';
import { SidebarLinks } from './index';

const Sidebar = () => {
  const { state } = useAppContext();
  const toggleSidebar = useToggleSidebar();

  return (
    <Wrapper>
      <div
        className={
          state.showSidebar
            ? 'sidebar-container show-sidebar'
            : 'sidebar-container'
        }
      >
        <div className='content'>
          <div className='nav-links'>
            <h3>Settings</h3>
            <SidebarLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
