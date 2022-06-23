import { useState } from 'react';
import Wrapper from '../assets/Wrapper/RegisterPageWrapper';
import img from '../assets/images/register.svg';

const initUserState = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const Register = () => {
  const [values, setValues] = useState(initUserState);
  const { username, email, password, confirmedPassword } = values;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Wrapper>
      <article className='grid'>
        <div className='img-block'>
          <img src={img} alt='register' />
        </div>
        <div>
          <form action=''>
            <div className='grid'>
              <input
                inputType='text'
                name={'username'}
                value={username}
                placeholder='Username'
                onChange={handleChange}
              />
              <input
                inputType='email'
                name={'email'}
                value={email}
                placeholder='Email'
                onChange={handleChange}
              />
            </div>

            <input
              inputType='password'
              name={'password'}
              value={password}
              placeholder='Password'
              onChange={handleChange}
            />
            <input
              inputType='password'
              name={'confirmedPassword'}
              value={confirmedPassword}
              placeholder='Confirm Password'
              onChange={handleChange}
            />
            <p>
              Already a member?
              <a href='/login'> Login</a>
            </p>
            <button type='submit' onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </article>
    </Wrapper>
  );
};

export default Register;
