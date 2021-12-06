import React from 'react';
import styles from './buttonLittleAdd.module.css';
import { BsPlus } from 'react-icons/bs';

const ButtonLittleAdd = (props) => {
  return (
    <button className={styles.button}>
      <BsPlus type={props.type} disabled={props.disabled} onClick={props.onClick} />
    </button>
  );
};

export default ButtonLittleAdd;
