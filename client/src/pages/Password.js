import { useState } from 'react';
import { Alert } from '../components';
import { useAppContext } from '../context/appContext';
import { useAlert, useAuthFetch } from '../hooks/index';
import Wrapper from '../assets/Wrapper/PasswordPageWrapper';

const initState = {
  newPassword: '',
  confirmNewPassword: '',
};

const Password = () => {
  const authFetch = useAuthFetch();
  const { state } = useAppContext();
  const [alert, displayAlert] = useAlert();
  const [values, setValues] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  const { newPassword, confirmNewPassword } = values;
  const { showAlert, alertText, alertType } = alert;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const { data } = await authFetch.patch(`/user/password`, {
        ...values,
        _id: state.user._id,
      });

      displayAlert(data.msg, 'success');
    } catch (error) {
      if (error.response.status !== 401) {
        displayAlert(error.response.data.msg, 'danger');
      }
    }
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <h3>Change Password</h3>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='newPassword'>New Password</label>
        <input
          type='password'
          name='newPassword'
          value={newPassword}
          onChange={handleChange}
        />
        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
        <input
          type='password'
          name='confirmNewPassword'
          value={confirmNewPassword}
          onChange={handleChange}
        />

        <button type='submit' disabled={isLoading} aria-busy={isLoading}>
          Save changes
        </button>
      </form>
    </Wrapper>
  );
};

export default Password;
