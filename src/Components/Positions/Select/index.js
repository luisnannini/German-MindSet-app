import React from 'react';
import styles from './select.module.css';

const Select = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Label</label>
      <select className={styles.select}></select>
    </div>
  );
};

export default Select;
