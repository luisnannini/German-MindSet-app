import React from 'react';
import ExitButton from '../ExitButton';
import Button from '../Button';
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
          <ExitButton onClick={props.onCancel} />
        </div>
        <div className={styles.message}>{props.message}</div>
        <div className={styles.button}>
          <Button label={'Confirm'} onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
