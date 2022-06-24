import { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAuthFetch, useGetExpenses, useAlert } from '../../hooks/index';
import Dropdown from '../Dropdown';
import timeFormat from '../../utils/timeFormat';

import DelConfirmModal from './DelConfirmModal';
import EditFormModal from './EditFormModal';

import Wrapper from '../../assets/Wrapper/SingleExpenseBlockWrapper';
import { useAppContext } from '../../context/appContext';
const SingleExpense = ({
  amount,
  category,
  incurred_on,
  title,
  notes,
  _id,
}) => {
  const date = new Date(incurred_on);
  const incurred_on_date = date.toISOString().substring(0, 10);
  const incurred_on_time = date.toISOString().substring(11, 16);

  const { state } = useAppContext();

  const [values, setValues] = useState({
    amount,
    category,
    incurred_on_date,
    incurred_on_time,
    title,
    notes,
    isLoading: false,
    showDelModal: false,
    showEditModal: false,
  });

  const [alert, displayAlert] = useAlert();
  const authFetch = useAuthFetch();
  const getExpenses = useGetExpenses();

  // UPDATE EXPENSE
  const updateExpense = async () => {
    setValues({ ...values, isLoading: true });
    try {
      await authFetch.patch(`/expenses/${_id}`, {
        ...values,
        incurred_on: values.incurred_on_date + ' ' + values.incurred_on_time,
      });
      getExpenses();
    } catch (error) {
      console.log(error);
    }
    setValues({ ...values, isLoading: false, showEditModal: false });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      displayAlert('Please provide all required values', 'danger');
    } else {
      updateExpense();
    }
  };

  // DELETE EXPENSE
  const handleRemoveExpense = async () => {
    setValues({ ...values, isLoading: true });
    try {
      await authFetch.delete(`/expenses/${_id}`);
      getExpenses();
    } catch (error) {
      console.log(error);
    }
    setValues({ ...values, isLoading: false, showDelModal: false });
  };

  return (
    <>
      <Wrapper data-target={_id}>
        <summary>
          <h2 className='amount'>${amount}</h2>
          <h4 className='title'>{title}</h4>
        </summary>
        <div className='info'>
          <ul>
            <li className='category'>{category.title}</li>
            <li className='incurred_on'>{timeFormat(incurred_on)}</li>
            {notes && <li className='notes'>{notes}</li>}
          </ul>
          <div className='btn-container'>
            <div
              role={'button'}
              className='contrast'
              onClick={() => {
                setValues({
                  ...values,
                  showDelModal: true,
                });
              }}
            >
              <FaTrash />
            </div>
            <div
              role={'button'}
              onClick={() => {
                setValues({ ...values, showEditModal: true });
              }}
            >
              <FaPen />
            </div>
          </div>
        </div>
      </Wrapper>
      {values.showDelModal && (
        <DelConfirmModal
          showModal={values.showDelModal}
          toggleShowModal={() => {
            setValues({
              ...values,
              showDelModal: !values.showDelModal,
            });
          }}
          dataTarget={_id}
          onConfirm={handleRemoveExpense}
        />
      )}
      {values.showEditModal && (
        <EditFormModal
          dataTarget={_id}
          values={values}
          setValues={setValues}
          alert={alert}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default SingleExpense;
