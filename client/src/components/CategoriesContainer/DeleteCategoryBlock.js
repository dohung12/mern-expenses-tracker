import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAuthFetch, useGetCategories, useAlert } from '../../hooks';
import Alert from '../Alert';
const DeleteCategoryBlock = () => {
  const { state } = useAppContext();
  const [category, setCategory] = useState('');

  const authFetch = useAuthFetch();
  const getCategories = useGetCategories();
  const [alert, displayAlert] = useAlert();
  const { showAlert, alertText, alertType } = alert;
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const deleteCategory = async () => {
    setIsLoading(true);
    try {
      const { data } = await authFetch.delete(`/category/${category}`);
      displayAlert(data.msg, 'success');
      getCategories();
    } catch (error) {
      console.log(error);
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteCategory();
  };

  return (
    <div className='delete-category'>
      <h5 className='header'>Delete Category</h5>
      {showAlert && <Alert alertText={alertText} alertType={alertType} />}

      <form action='' onSubmit={handleSubmit}>
        <select onChange={handleChange} value={category}>
          {state.categories.map((option, index) => {
            return (
              <option value={option._id} key={index}>
                {option.title}
              </option>
            );
          })}
        </select>
        <button
          type='submit'
          className='contrast'
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {!isLoading && 'Delete'}
        </button>
      </form>
    </div>
  );
};

export default DeleteCategoryBlock;
