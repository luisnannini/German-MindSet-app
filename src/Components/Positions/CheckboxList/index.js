import React from 'react';
import styles from './checkboxList.module.css';

const CheckboxList = ({ object, label }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {object.map((profile) => {
        return (
          <div className={styles.checkboxContainer}>
            <input key={profile._id} type={'checkbox'} value={profile._id}></input>
            <span>{profile.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxList;
