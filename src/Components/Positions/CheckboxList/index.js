import React from 'react';
import styles from './checkboxList.module.css';

const CheckboxList = (props) => {
  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      {props.object.map((data) => {
        return (
          <div className={styles.checkboxContainer}>
            <input key={data._id} type={'checkbox'} value={data._id}></input>
            <span>{data.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxList;
