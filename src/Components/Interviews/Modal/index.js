import React from 'react';
import styles from './modal.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.message}>
      <ButtonCancel onClick={props.onCancel} />
      <p>{props.message}</p>
    </div>
  );
};

export default Modal;
