import React from 'react';
import styles from './select.module.css';

const Select = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <select
        className={props.meta.error && props.meta.touched ? styles.error : styles.select}
        disabled={props.disabled}
        {...props.input}
      >
        <option value="" disabled hidden>
          {props.title}
        </option>
        <option value="asdasd">asd</option>
        {props.object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.name}
            </option>
          );
        })}
      </select>
      {props.meta.error && props.meta.touched && (
        <span className={styles.errorSpan}>{props.meta.error}</span>
      )}
    </div>
  );
};

export default Select;
