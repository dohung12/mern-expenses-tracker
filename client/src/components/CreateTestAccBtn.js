import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSetupUser } from '../hooks/index';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const CreateTestAccBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAppContext();
  const setupUser = useSetupUser();
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/test');
      setupUser(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (state.user) {
      navigate('/');
    }
  }, [state.user, navigate]);

  return (
    <button
      disabled={isLoading}
      aria-busy={isLoading}
      className='secondary '
      onClick={handleClick}
    >
      Create Test Account
    </button>
  );
};

export default CreateTestAccBtn;
