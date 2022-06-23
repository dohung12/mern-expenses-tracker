import img from '../assets/images/main.svg';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/Wrapper/LandingPageWrapper';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper className='container'>
      <div className='grid'>
        <img src={img} alt='main' />
        <div>
          <hgroup className='info'>
            <h1>Money Tracking App</h1>
            <h6>
              Welcome to 'Where's my Money?', a place for you to track your
              spending conveniently.
            </h6>
          </hgroup>
          <div className='btn-container'>
            <button
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/register');
              }}
              className='contrast'
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
