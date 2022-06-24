import { useState } from 'react';

const AddCategoryModal = ({ dataTarget, toggleModal, showModal }) => {
  const [category, setCategory] = useState('');

  const handleConfirm = () => {
    console.log(category);
    toggleModal();
  };
  return (
    <dialog open={showModal}>
      <article>
        <a
          href='#close'
          aria-label='Close'
          className='close'
          data-target={dataTarget}
          onClick={toggleModal}
        ></a>
        <h3>Create new category</h3>
        <form action=''>
          <input
            type='text'
            name='category'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <div className='btn-container'>
            <a
              href='#cancel'
              role='button'
              className='secondary'
              data-target={dataTarget}
              onClick={toggleModal}
            >
              Cancel
            </a>
            <a
              href='#confirm'
              role='button'
              data-target={dataTarget}
              onClick={handleConfirm}
            >
              Confirm
            </a>
          </div>
        </form>
      </article>
    </dialog>
  );
};

export default AddCategoryModal;
