import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './buttonDelete.module.css';

const ButtonDelete = (props) => {
  return (
    <button className={styles.button} disabled={props.disabled}>
      <FaTrash onClick={props.onClick} />
    </button>
  );
};

export default ButtonDelete;
