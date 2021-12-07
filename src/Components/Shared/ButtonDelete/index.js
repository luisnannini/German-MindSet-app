import React from 'react';
import styles from './buttonDelete.module.css';
import { FaTrash } from 'react-icons/fa';

const ButtonDelete = (props) => {
  return (
    <button className={styles.button}>
      <FaTrash onClick={props.onClick} />
    </button>
  );
};

export default ButtonDelete;
