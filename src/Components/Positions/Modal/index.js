import React from 'react';
//import { useState, useEffect } from 'react';
import Close from '../Close';
import Button from '../Button';
import styles from './modal.module.css';

const Modal = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Title</h3>
          <Close onClick={props.closeModal} />
        </div>
        <div className={styles.message}>Are you sure you want to delete this position?</div>
        <div className={styles.button}>
          <Button label={'Confirm'} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
