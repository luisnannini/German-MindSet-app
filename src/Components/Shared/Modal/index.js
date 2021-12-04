import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{props.title}</h3>
        </div>
        <div className={styles.message}>{props.message}</div>
        <div className={styles.btnContainer}>
          <button className={styles.confirmButton} onClick={props.onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
