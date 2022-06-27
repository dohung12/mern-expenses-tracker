import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch, useGetCategories, useAlert } from '../../hooks';
import Alert from '../Alert';
const UpdateCategoryBlock = () => {
  const { state } = useAppContext();

  const authFetch = useAuthFetch();
  const getCategories = useGetCategories();
  const [alert, displayAlert] = useAlert();

  const { showAlert, alertText, alertType } = alert;

  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const updateCategory = async () => {
    setIsLoading(true);
    try {
      await authFetch.patch(`/category/${categoryId}`, {
        title: newTitle,
      });
      displayAlert('Update Category Successful', 'success');
      getCategories();
      setNewTitle('');
    } catch (error) {
      console.log(error);
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory();
  };

  return (
    <div>
      <h5 className='header'>Update Category</h5>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}

      <form action='' onSubmit={handleSubmit}>
        <select onChange={handleChange} value={categoryId}>
          {state.categories.map((option, index) => {
            return (
              <option value={option._id} key={index}>
                {option.title}
              </option>
            );
          })}
        </select>

        <input
          type='text'
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          placeholder='Set a new title for category'
        />
        <button type='submit' disabled={isLoading} aria-busy={isLoading}>
          {!isLoading && 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryBlock;
