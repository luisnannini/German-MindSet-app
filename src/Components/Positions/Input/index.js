import React from 'react';
import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input
        className={styles.input}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        required={props.required}
        min={props.min}
      ></input>
    </div>
  );
};

export default Input;
