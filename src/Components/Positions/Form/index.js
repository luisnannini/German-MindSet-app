import React from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Close from '../Close';
import styles from './form.module.css';

const Form = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Title</h2>
          <Close onClick={onClose} />
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

export default Form;
