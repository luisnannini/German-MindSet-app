import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from './buttonLittleAdd.module.css';

const ButtonLittleAdd = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <FaPlus />
    </button>
  );
};

export default ButtonLittleAdd;
