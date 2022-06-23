import { useNavigate } from 'react-router-dom';
import img from '../assets/images/login.svg';
import Wrapper from '../assets/Wrapper/LoginPageWrapper';

const initUserState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initUserState);
  const navigate = useNavigate();
  const { email, password } = values;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Wrapper className='container'>
      <article className='grid'>
        {!user && (
          <form action=''>
            <h1>Login</h1>

            <input
              inputType='email'
              name={'email'}
              value={email}
              placeholder='Email'
              onChange={handleChange}
            />

            <input
              inputType='password'
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
          <img src={img} alt='register' />
        </div>
      </article>
    </Wrapper>
  );
};

export default Login;
