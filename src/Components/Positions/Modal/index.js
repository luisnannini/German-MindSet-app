import React from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Close from '../Close';
import styles from './modal.module.css';

const Modal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Title</h2>
          <Close />
        </div>
        <div className={styles.fields}>
          <Select />
          <Select />
          <Select />
          <Input />
          <Select />
        </div>
        <div className={styles.button}>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Modal;
