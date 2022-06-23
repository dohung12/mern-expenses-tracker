import React from 'react';

const DelConfirmModal = ({
  showModal,
  toggleShowModal,
  dataTarget,
  onConfirm,
}) => {
  return (
    <dialog open={showModal}>
      <article>
        <a
          href='#close'
          aria-label='Close'
          className='close'
          data-target={dataTarget}
          onClick={toggleShowModal}
        ></a>
        <h3>Confirm your action!</h3>
        <p>Do you want to remove this expense?</p>
        <footer>
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
            onClick={onConfirm}
          >
            Confirm
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default DelConfirmModal;
