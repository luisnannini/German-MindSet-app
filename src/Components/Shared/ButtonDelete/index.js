import React from 'react';
import styles from './buttonDelete.module.css';
import { FaTrash } from 'react-icons/fa';

const ButtonDelete = (props) => {
  return <FaTrash onClick={props.onClick} className={styles.delete} />;
};

export default ButtonDelete;
