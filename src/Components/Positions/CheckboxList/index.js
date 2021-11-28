import React from 'react';
import styles from './checkboxList.module.css';

const CheckboxList = (props) => {
  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      {props.object.map((date) => {
        return (
          <div className={styles.checkboxContainer}>
            <input key={date._id} type={'checkbox'} value={date._id}></input>
            <span>{date.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxList;
