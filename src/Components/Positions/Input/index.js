import React from 'react';
import styles from './input.module.css';

const Input = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Label</label>
      <input className={styles.input}></input>
    </div>
  );
};

export default Input;
