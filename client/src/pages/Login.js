import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, useSetupUser } from '../hooks/';
import { useAppContext } from '../context/appContext';
import { Alert } from '../components/';
import axios from 'axios';
import img from '../assets/images/login.svg';
import Wrapper from '../assets/Wrapper/LoginPageWrapper';

const initUserState = {
  email: '',
  password: '',
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setupUser = useSetupUser();

  const [values, setValues] = useState(initUserState);
  const { email, password } = values;

  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;

  const { state } = useAppContext();

  /**
   * HANDLE FORM INPUT CHANGES
   */
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /**
   * HANDLE FORM SUBMIT
   */

  const loginUser = async (currentUser) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token } = data;
      // save data to global context
      setupUser({ user, token });
      // display alert
      displayAlert('Login success!', 'success');
    } catch (error) {
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    // check if missing input fields
    if (!email || !password) {
      displayAlert('Please provide all information', 'danger');
    } else {
      loginUser({ email, password });
    }
  };

  /**
   * REDIRECT AFTER LOGIN SUCCESS
   */

  useEffect(() => {
    if (state.user) {
      setTimeout(() => navigate('/'), 2000);
    }
  }, [state.user, navigate]);

  return (
    <Wrapper className='container'>
      <article className='grid'>
        {state.user && (
          <hgroup>
            <h1>You are already login</h1>
            <p aria-busy='true'>Navigate to home page ...</p>
          </hgroup>
        )}
        {!state.user && (
          <form action=''>
            <h1>Login</h1>

            {showAlert && <Alert alertText={alertText} alertType={alertType} />}
            <input
              type='email'
              name={'email'}
              value={email}
              placeholder='Email'
              onChange={handleChange}
            />

            <input
              type='password'
              name={'password'}
              value={password}
              placeholder='Password'
              onChange={handleChange}
            />

            <p
              style={{
                textAlign: 'end',
              }}
            >
              Not a member?
              <a href='/register'> Register</a>
            </p>
            <button
              type='submit'
              className='contrast'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting ...' : 'Submit'}
            </button>
          </form>
        )}
        <div className='img-block'>
          <img src={img} alt='login' />
        </div>
      </article>
    </Wrapper>
  );
};

export default Login;
