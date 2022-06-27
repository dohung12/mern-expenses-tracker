import { useState } from 'react';
import { useAuthFetch, useGetCategories, useAlert } from '../../hooks';
import Alert from '../Alert';

const CreateCategoryBlock = () => {
  const [category, setCategory] = useState('');
  const authFetch = useAuthFetch();
  const getCategories = useGetCategories();
  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async () => {
    setIsLoading(true);
    try {
      await authFetch.post('/category', {
        title: category,
      });
      displayAlert('Create New Category Successful', 'success');
      getCategories();
    } catch (error) {
      console.log(error);
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!category) {
      displayAlert("Category's title must not be empty", 'danger');
    } else {
      createCategory();
    }
  };

  return (
    <div>
      <h5 className='header'>Create new category</h5>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}
      <form action=''>
        <input
          type='text'
          name='category'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <button aria-busy={isLoading} onClick={handleConfirm}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryBlock;
