import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import Wrapper from '../../assets/Wrapper/SingleExpenseBlockWrapper';
import DelConfirmModal from './DelConfirmModal';
import { useAuthFetch, useGetExpenses } from '../../hooks/index';
const SingleExpense = ({
  amount,
  category,
  incurred_on,
  title,
  notes,
  _id,
}) => {
  const initState = { amount, category, incurred_on, title, notes };
  const [values, setValues] = useState({
    ...initState,
    isLoading: false,
    isEditing: false,
    showModal: false,
  });

  const authFetch = useAuthFetch();
  const getExpenses = useGetExpenses();

  // EDIT EXPENSE
  const handleEditBtn = () => {
    setValues({ ...values, isEditing: true });
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
    setValues({ ...values, isLoading: false, showModal: false });
  };

  const handleDelBtn = () => {
    setValues({
      ...values,
      showModal: true,
    });
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
            <li className='category'>{category}</li>
            <li className='incurred_on'>{incurred_on}</li>
            {notes && <li className='notes'>{notes}</li>}
          </ul>
          <div className='btn-container'>
            <div role={'button'} className='contrast' onClick={handleDelBtn}>
              <FaTrash />
            </div>
            <div role={'button'} onClick={handleEditBtn}>
              <FaPen />
            </div>
          </div>
        </div>
      </Wrapper>
      {values.showModal && (
        <DelConfirmModal
          showModal={values.showModal}
          toggleShowModal={() => {
            setValues({
              ...values,
              showModal: !values.showModal,
            });
          }}
          dataTarget={_id}
          onConfirm={handleRemoveExpense}
        />
      )}
    </>
  );
};

export default SingleExpense;
