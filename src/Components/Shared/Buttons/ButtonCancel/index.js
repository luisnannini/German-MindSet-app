import React from 'react';
import styles from './buttonCancel.module.css';

const ButtonCancel = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick} disabled={props.disabled}>
      Cancel
    </button>
  );
};

export default ButtonCancel;
