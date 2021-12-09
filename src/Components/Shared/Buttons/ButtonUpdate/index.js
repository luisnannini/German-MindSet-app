import React from 'react';
import { FaPen } from 'react-icons/fa';
import styles from './buttonUpdate.module.css';

const ButtonUpdate = (props) => {
  return (
    <button className={styles.button} disabled={props.disabled}>
      <FaPen onClick={props.onClick} />
    </button>
  );
};

export default ButtonUpdate;
