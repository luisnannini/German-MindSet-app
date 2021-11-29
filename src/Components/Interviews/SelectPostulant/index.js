import React from 'react';
import styles from './selectpostulant.module.css';

const SelectPostulant = (props) => {
  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={props.onChange}>
        {props.object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.firstName} {data.lastName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectPostulant;
