import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const SidebarLinks = ({ toggleSidebar }) => {
  return (
    <>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </>
  );
};

export default SidebarLinks;
