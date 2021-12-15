import React from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './buttonLittleAdd.module.css';

const ButtonLittleAdd = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <BsPlus />
    </button>
  );
};

export default ButtonLittleAdd;
