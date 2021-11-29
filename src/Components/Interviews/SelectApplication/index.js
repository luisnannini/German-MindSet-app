import React from 'react';
import styles from './selectapplication.module.css';

const SelectApplication = (props) => {
  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={props.onChange}>
        <option value="0" selected="selected">
          Id
        </option>
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
