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
    }
    setIsLoading(false);
  };

  const handleConfirm = () => {
    if (!category) {
      displayAlert("Category's title must not be empty", 'danger');
    } else {
      createCategory();
    }
  };

  return (
    <div>
      <h3>Create new category</h3>
      <form action=''>
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        <input
          type='text'
          name='category'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <a
          href='#confirm'
          role='button'
          aria-busy={isLoading}
          onClick={handleConfirm}
        >
          Confirm
        </a>
      </form>
    </div>
  );
};

export default CreateCategoryBlock;
