import React from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './buttonLittleAdd.module.css';

const ButtonLittleAdd = (props) => {
  return (
    <button className={styles.button}>
      <BsPlus type={props.type} onClick={props.onClick} disabled={props.disabled} />
    </button>
  );
};

export default ButtonLittleAdd;
