import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useAlert, useAuthFetch, useSetupUser } from '../hooks/index';
import { Alert } from '../components/';
import Wrapper from '../assets/Wrapper/ProfilePageWrapper';

const Profile = () => {
  const { state } = useAppContext();
  const authFetch = useAuthFetch();
  const setupUser = useSetupUser();

  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState(state.user);
  const { email, profilePic, username } = values;

  const [alert, displayAlert] = useAlert();
  const { showAlert, alertType, alertText } = alert;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleUploadImage = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    setIsLoading(true);
    try {
      const { data } = await authFetch.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setValues({ ...values, profilePic: data.img.src });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.patch(`/user/profile`, values);
      const { token, user } = data;
      setupUser({ user, token });
      displayAlert('Update success!', 'success');
    } catch (error) {
      console.log(error);
      if (error.response.status !== 401) {
        displayAlert(error.response.data.msg, 'danger');
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !profilePic || !username) {
      displayAlert('Please provide all values', 'danger');
    } else {
      updateProfile();
    }
  };
  return (
    <Wrapper>
      <hgroup>
        <h3>Setting Profile</h3>
        <p>Update your profile pic and personal information.</p>
      </hgroup>

      <form action='' onSubmit={handleSubmit}>
        <h5>Change your profile picture</h5>
        <div className='img-input'>
          <img src={profilePic} alt='avatar' crossOrigin='anonymous' />
          {isLoading && <p aria-busy={isLoading}>Loading ...</p>}
          <input type='file' name='profilePic' onChange={handleUploadImage} />
        </div>
        <h5>Change your personal information</h5>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type={'email'}
          name='email'
          placeholder={'Email'}
          value={email}
          readOnly
        />
        <label htmlFor='username'>Username</label>
        <input
          type={'text'}
          name='username'
          placeholder={'Username'}
          onChange={handleChange}
          value={username}
        />

        {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        <button type='submit' disabled={isLoading} aria-busy={isLoading}>
          Save changes
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
