import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.message}>
      <p>{props.message}</p>
    </div>
  );
};

export default Modal;
