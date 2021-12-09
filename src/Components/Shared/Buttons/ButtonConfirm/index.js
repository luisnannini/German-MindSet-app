import React from 'react';
import styles from './buttonConfirm.module.css';

const ButtonConfirm = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Confirm
    </button>
  );
};

export default ButtonConfirm;
