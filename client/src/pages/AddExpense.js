import { useState } from 'react';
import { FormRow, Alert } from '../components/';
import { useAlert, useAuthFetch } from '../hooks/index';
import Wrapper from '../assets/Wrapper/AddExpensePageWrapper';

const initState = {
  title: '',
  category: '',
  amount: 0,
  incurred_on_date: '',
  incurred_on_time: '',
  notes: '',
};

const AddExpense = () => {
  const [values, setValues] = useState(initState);
  const { title, category, amount, notes, incurred_on_date, incurred_on_time } =
    values;

  const [alert, displayAlert] = useAlert();
  const { showAlert, alertType, alertText } = alert;
  const [isLoading, setIsLoading] = useState(false);

  const authFetch = useAuthFetch();

  const clearForm = () => {
    setValues(initState);
  };

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
      clearForm();
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
      console.log(values);
      createExpense();
    }
  };

  return (
    <Wrapper>
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
            name={'category'}
            handleChange={handleChange}
            placeholder='category'
            type={'text'}
            key='category'
            value={category}
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
        <Alert />
        {showAlert && <Alert alertText={alertText} alertType={alertType} />}

        <button type='submit' disabled={isLoading}>
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default AddExpense;
