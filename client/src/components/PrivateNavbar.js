import { NavLink } from 'react-router-dom';
import { FaAlignLeft } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import { useToggleSidebar } from '../hooks/index';

// import LogoutBtn from './LogoutBtn';
// import Avatar from './Avatar';
// import SearchForm from './SearchForm';
import Logo from './Logo';

import Wrapper from '../assets/Wrapper/PrivateNavbarWrapper';
import links from '../utils/links';
const PrivNavBar = () => {
  const { state } = useAppContext();
  const { username } = state.user;

  const toggleSidebar = useToggleSidebar();

  return (
    <Wrapper className='container-fluid'>
      <ul>
        <li>
          <div
            role={'button'}
            className='outline contrast'
            onClick={toggleSidebar}
          >
            <FaAlignLeft />
          </div>
        </li>
        <li className='logo'>
          <Logo />
          <a href='/'>
            <h2>Where's My Money</h2>
          </a>
        </li>
      </ul>
      {/* <SearchForm /> */}
      <ul>
        <li>
          <details role={'list'} dir='rtl'>
            <summary aria-haspopup='listbox' role={'link'}>
              {/* <Avatar src={state.user.profilePic} /> */}
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
