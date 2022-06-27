import { useState, useEffect } from 'react';
import { FormRow, Alert, Dropdown, CategoriesContainer } from '../components/';
import { useAlert, useAuthFetch, useGetCategories } from '../hooks/index';
import Wrapper from '../assets/Wrapper/AddExpensePageWrapper';
import { useAppContext } from '../context/appContext';

const initState = {
  title: '',
  category: '',
  amount: 0,
  incurred_on_date: '',
  incurred_on_time: '',
  notes: '',
  showModal: false,
};

const AddExpense = () => {
  const [values, setValues] = useState(initState);
  const { title, category, amount, notes, incurred_on_date, incurred_on_time } =
    values;

  const { state } = useAppContext();
  const [alert, displayAlert] = useAlert();
  const { showAlert, alertType, alertText } = alert;
  const [isLoading, setIsLoading] = useState(false);
  const getCategories = useGetCategories();

  const authFetch = useAuthFetch();
  //  CREATE NEW EXPENSE CONTROLLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const createExpense = async () => {
    setIsLoading(true);
    try {
      await authFetch.post('/expenses', {
        title,
        category,
        amount,
        notes,
        incurred_on: `${incurred_on_date} ${incurred_on_time}`,
      });
      displayAlert('Create New Expense Successful', 'success');
      // CLEAR FORM
      setValues(initState);
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }
      displayAlert(error.response.data.msg, 'danger');
    }
    setIsLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      displayAlert('Please provide all required values', 'danger');
    } else {
      createExpense();
    }
  };

  // FETCH CATEGORIES WHEN LOADING
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Wrapper data-target='add-expense-form'>
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        <h2>Create New Expense</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='grid'>
            <FormRow
              name={'title'}
              handleChange={handleChange}
              placeholder='Title'
              type={'text'}
              key='title'
              value={title}
              required
            />
            <FormRow
              name={'amount'}
              handleChange={handleChange}
              type={'number'}
              key='amount'
              value={amount}
              required
            />
            <Dropdown
              optionLists={state.categories}
              name={'category'}
              handleChange={handleChange}
            />
          </div>
          <div className='grid'>
            <FormRow
              name={'incurred_on_date'}
              handleChange={handleChange}
              labelText={'Date'}
              type={'date'}
              value={incurred_on_date}
            />
            <FormRow
              name={'incurred_on_time'}
              handleChange={handleChange}
              labelText={'time'}
              type={'time'}
              value={incurred_on_time}
            />
            <FormRow
              name={'notes'}
              handleChange={handleChange}
              placeholder='Notes'
              type={'text'}
              value={notes}
            />
          </div>
          <div className='grid'>
            <button type='submit' disabled={isLoading}>
              Submit
            </button>
          </div>
        </form>
      </Wrapper>

      <CategoriesContainer />
    </>
  );
};

export default AddExpense;
