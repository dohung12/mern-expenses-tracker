import Wrapper from '../assets/Wrapper/LogOutPageWrapper';
import { useNavigate } from 'react-router-dom';
import { useLogoutUser } from '../hooks/index';
const LogOut = () => {
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

  return (
    <Wrapper>
      <header>Log Out Confirmation</header>
      <h1>Do you want to log out?</h1>
      <div className='btn-container'>
        <button
          className='contrast'
          onClick={() => {
            navigate('/');
          }}
        >
          Cancel
        </button>
        <button onClick={logoutUser}>Confirm</button>
      </div>
    </Wrapper>
  );
};

export default LogOut;
