import React from 'react';
import styles from './selectapplication.module.css';

const SelectApplication = (props) => {
  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        <option value="">Id</option>
        {props.object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.result}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectApplication;
