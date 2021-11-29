import React from 'react';
import styles from './select.module.css';

const Select = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <select value={props.value} className={styles.select} onChange={props.onChange}>
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.object.map((data) => {
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
