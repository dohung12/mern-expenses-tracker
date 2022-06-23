import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import Wrapper from '../assets/Wrapper/SingleExpenseBlockWrapper';

const SingleExpense = ({
  amount,
  category,
  incurred_on,
  title,
  notes,
  _id,
}) => {
  const handleEditBtn = () => {
    console.log('edit btn');
  };

  const handleDelBtn = () => {
    console.log('del btn');
  };

  return (
    <Wrapper>
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
  );
};

export default SingleExpense;
