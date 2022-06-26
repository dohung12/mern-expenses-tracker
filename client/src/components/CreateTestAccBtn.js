import { useState } from 'react';
import axios from 'axios';
import { useSetupUser } from '../hooks/index';
const CreateTestAccBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setupUser = useSetupUser();
  const handleClick = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get('/auth/test');
      setupUser(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      aria-busy={isLoading}
      className=''
      onClick={handleClick}
    >
      Create Test Account
    </button>
  );
};

export default CreateTestAccBtn;
