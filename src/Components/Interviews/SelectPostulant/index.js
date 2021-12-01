import React from 'react';
import styles from './selectpostulant.module.css';

const SelectPostulant = (props) => {
  return (
    <form className={styles.container}>
      <select
        className={styles.select}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        <option value="0">Postulant Name</option>
        {props.object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.firstName} {data.lastName}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default SelectPostulant;
