import React from 'react';
import styles from './modal.module.css';
import ButtonConfirm from '../ButtonConfirm';
import ButtonCancel from '../ButtonCancel';

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
          <ButtonCancel disabled={props.isLoading} onClick={props.onCancel} />
          <ButtonConfirm disabled={props.isLoading} onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
