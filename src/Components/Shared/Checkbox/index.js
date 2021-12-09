import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.checkbox}
        type={'checkbox'}
        checked={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      ></input>
    </div>
  );
};

export default Checkbox;
