import React from 'react';
import styles from './buttonCancel.module.css';

const ButtonCancel = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button} disabled={props.disabled}>
      Cancel
    </button>
  );
};

export default ButtonCancel;
