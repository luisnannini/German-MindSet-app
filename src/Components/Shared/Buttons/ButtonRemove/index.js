import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './buttonRemove.module.css';

const ButtonRemove = (props) => {
  return (
    <button className={styles.button} disabled={props.disabled}>
      <FaTimes onClick={props.onClick} />
    </button>
  );
};

export default ButtonRemove;
