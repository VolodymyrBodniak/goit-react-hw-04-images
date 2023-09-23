import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, toggleModal }) => {
  useEffect(() => {
    function escCloseModal(e) {
      if (e.code === 'Escape') {
        toggleModal();
      }
    }
    window.addEventListener('keydown', escCloseModal);
    return () => window.removeEventListener('keydown', escCloseModal);
  }, [toggleModal]);

  const closeOnBackDrop = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeOnBackDrop}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
