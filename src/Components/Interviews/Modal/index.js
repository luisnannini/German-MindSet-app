import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.message}>
      <button type="button" onClick={props.onCancel}>
        x
      </button>
      <p>{props.message}</p>
    </div>
  );
};

export default Modal;
