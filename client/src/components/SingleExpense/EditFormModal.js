import { FormRow, Alert } from '../index';
import Wrapper from '../../assets/Wrapper/EditFormModalWrapper';

const EditFormModal = ({
  handleSubmit,
  values,
  alert,
  dataTarget,
  setValues,
}) => {
  const {
    title,
    category,
    amount,
    notes,
    isLoading,
    incurred_on_date,
    incurred_on_time,
  } = values;

  const { showAlert, alertText, alertType } = alert;

  const toggleShowModal = () => {
    setValues({ ...values, showEditModal: !values.showEditModal });
  };

  // EDIT EXPENSE
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Wrapper open={values.showEditModal}>
      <article>
        <a
          href='#close'
          aria-label='Close'
          className='close'
          data-target={dataTarget}
          onClick={toggleShowModal}
        ></a>
        <h4>Edit Expense</h4>
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
            <FormRow
              name={'notes'}
              handleChange={handleChange}
              placeholder='notes'
              type={'text'}
              key='notes'
              value={notes}
            />
          </div>

          {showAlert && <Alert alertText={alertText} alertType={alertType} />}
        </form>
        <footer className='btn-container'>
          <a
            href='#cancel'
            role='button'
            className='secondary'
            data-target={dataTarget}
            onClick={toggleShowModal}
          >
            Cancel
          </a>
          <a
            href='#confirm'
            role='button'
            data-target={dataTarget}
            onClick={handleSubmit}
            aria-busy={isLoading}
          >
            Confirm
          </a>
        </footer>
      </article>
    </Wrapper>
  );
};

export default EditFormModal;
