import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.checkbox}
        disabled={props.disabled}
        type="checkbox"
        {...props.input}
      ></input>
    </div>
  );
};

export default Checkbox;
