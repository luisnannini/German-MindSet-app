import React from 'react';
import styles from './input.module.css';

const Input = ({ label }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input}></input>
    </div>
  );
};

export default Input;
