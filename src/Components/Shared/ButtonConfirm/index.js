import React from 'react';
import styles from './buttonConfirm.module.css';

const ButtonConfirm = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={styles.button}
    >
      Confirm
    </button>
  );
};

export default ButtonConfirm;
