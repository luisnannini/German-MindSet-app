import React from 'react';
import styles from './select.module.css';

const Select = ({ object, label }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select}>
        {object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
