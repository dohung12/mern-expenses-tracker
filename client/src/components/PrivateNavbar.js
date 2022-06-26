import { NavLink } from 'react-router-dom';
import {
  FaAlignLeft,
  FaChartLine,
  FaHouseUser,
  FaPlus,
  FaSearch,
} from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useToggleSidebar } from '../hooks/index';

import { Logo, Avatar } from './index';

import Wrapper from '../assets/Wrapper/PrivateNavbarWrapper';
import links from '../utils/links';
const PrivNavBar = () => {
  const { state } = useAppContext();
  const { username } = state.user;
  const toggleSidebar = useToggleSidebar();

  return (
    <Wrapper className='container-fluid'>
      <ul className='icons-container'>
        <li>
          <div
            role={'button'}
            className=' outline toggle-btn'
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
          </div>
        </li>
        <li className='logo'>
          <Logo />
          <a href='/'>
            <h3 className='brand'>Where's My Money</h3>
          </a>
        </li>
      </ul>
      <ul className='icons-container'>
        <li>
          <NavLink
            to='/'
            data-tooltip='Homepage'
            className={({ isActive }) => (isActive ? 'icon active' : 'icon')}
          >
            <FaHouseUser />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/add-expense'
            className={({ isActive }) => (isActive ? 'icon active' : 'icon')}
            data-tooltip='Add new expense'
          >
            <FaPlus />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/all-expenses'
            className={({ isActive }) => (isActive ? 'icon active' : 'icon')}
            data-tooltip='Search for an expense'
          >
            <FaSearch />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/stats'
            className={({ isActive }) => (isActive ? 'icon active' : 'icon')}
            data-tooltip='Show reports'
          >
            <FaChartLine />
          </NavLink>
        </li>
        <li>
          <details role={'list'} dir='rtl'>
            {/* eslint-disable-next-line */}
            <summary aria-haspopup='listbox' role={'link'}>
              <Avatar src={state.user.profilePic} />
              <h5>{username}</h5>
            </summary>
            <ul role={'listbox'}>
              {links.map((link) => {
                const { id, text, path, icon } = link;
                return (
                  <li key={id} className='nav-link'>
                    {icon}
                    <NavLink to={path}>{text}</NavLink>
                  </li>
                );
              })}

              {/* <li>
                <LogoutBtn />
              </li> */}
            </ul>
          </details>
        </li>
      </ul>
    </Wrapper>
  );
};

export default PrivNavBar;
