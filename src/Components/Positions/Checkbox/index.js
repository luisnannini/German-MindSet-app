import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input type={'checkbox'} className={styles.checkbox}></input>
    </div>
  );
};

export default Checkbox;
