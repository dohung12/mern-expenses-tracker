import React from 'react';
import Wrapper from '../assets/Wrapper/SmallSidebarWrapper';
import { useAppContext } from '../context/appContext';
import { useToggleSidebar } from '../hooks';
import { FaTimes } from 'react-icons/fa';

import SidebarLinks from './SidebarLinks';
import Logo from './Logo';

const SmallSidebar = () => {
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
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            <SidebarLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
