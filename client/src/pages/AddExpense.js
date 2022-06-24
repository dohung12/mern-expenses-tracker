import { useState, useEffect } from 'react';
import { FormRow, Alert, Dropdown, AddCategoryModal } from '../components/';
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

  // CREATE NEW CATEGORY CONTROLLER
  const toggleModal = () => {
    setValues({
      ...values,
      showModal: !values.showModal,
    });
  };

  // FETCH CATEGORIES WHEN LOADING
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Wrapper data-target='add-expense-form'>
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        <form action='' onSubmit={handleSubmit}>
          <div className='grid'>
            <FormRow
              name={'title'}
              handleChange={handleChange}
              placeholder='title'
              type={'text'}
              key='title'
              value={title}
              required
            />
            <FormRow
              name={'amount'}
              handleChange={handleChange}
              placeholder='amount'
              type={'number'}
              key='amount'
              value={amount}
              required
            />
          </div>
          <div className='grid'>
            <Dropdown
              optionLists={state.categories}
              name={'category'}
              handleChange={handleChange}
              // value={category}
            />
            <FormRow
              name={'incurred_on_date'}
              handleChange={handleChange}
              placeholder='incurred on date'
              labelText={'Date'}
              type={'date'}
              key='incurred_on_date'
              value={incurred_on_date}
            />
            <FormRow
              name={'incurred_on_time'}
              handleChange={handleChange}
              placeholder='incurred on time'
              labelText={'time'}
              type={'time'}
              key='incurred_on_time'
              value={incurred_on_time}
            />
          </div>
          <FormRow
            name={'notes'}
            handleChange={handleChange}
            placeholder='notes'
            type={'text'}
            key='notes'
            value={notes}
          />
          <a href='#newCategory' onClick={toggleModal}>
            Add new category
          </a>
          <button type='submit' disabled={isLoading}>
            Submit
          </button>
        </form>
      </Wrapper>

      {/* New Category Modal */}
      {values.showModal && (
        <AddCategoryModal
          dataTarget={'add-expense-form'}
          showModal={values.showModal}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default AddExpense;
