import React from 'react';
import styles from './modal.module.css';
import Form from '../Form';

const Modal = (props) => {
  const { setModal, openModal } = props;
  if (!openModal) {
    return null;
  }
  const handleClose = () => setModal(!openModal);
  return (
    <div className={styles.modal}>
      <div className={styles.buttons}>
        <Form />
        <button className={styles.cancel} onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
