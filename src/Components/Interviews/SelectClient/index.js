import React from 'react';
import styles from './selectclient.module.css';

const SelectClient = (props) => {
  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={props.onChange}>
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

export default SelectClient;
