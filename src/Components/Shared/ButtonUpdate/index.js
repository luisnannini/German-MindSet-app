import React from 'react';
import styles from './buttonUpdate.module.css';
import { FaPen } from 'react-icons/fa';

const ButtonUpdate = (props) => {
  return (
    <button className={styles.button}>
      <FaPen onClick={props.onClick} />
    </button>
  );
};

export default ButtonUpdate;
