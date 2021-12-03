import React from 'react';
import styles from './inputs.module.css';

const Input = (props) => {
  return (
    <input
      className={styles.input}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required
    />
  );
};

export default Input;
