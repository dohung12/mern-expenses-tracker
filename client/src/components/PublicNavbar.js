import Logo from './Logo';
import Wrapper from '../assets/Wrapper/PublicNavbarWrapper';
const PublicNavbar = () => {
  return (
    <Wrapper className='container-fluid'>
      <ul>
        <li className='logo-container'>
          <Logo />
        </li>
        <li>
          <h3 className='brand'>Where's my Money</h3>
        </li>
      </ul>
      <ul>
        <li>
          <a href='/login' role={'button'}>
            Login
          </a>
        </li>
        <li>
          <a href='/register' role={'button'} className='contrast'>
            Register
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default PublicNavbar;
