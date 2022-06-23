import Wrapper from '../assets/Wrapper/LogoWrapper';
import logo from '../assets/images/logo.svg';

const Logo = () => {
  return (
    <Wrapper href='/'>
      <img src={logo} alt='logo' />
    </Wrapper>
  );
};

export default Logo;
