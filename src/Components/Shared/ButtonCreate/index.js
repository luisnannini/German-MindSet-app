import React from 'react';
import styles from './buttonCreate.module.css';
import { FaPlusCircle } from 'react-icons/fa';

const ButtonCreate = (props) => {
  return (
    <button className={styles.button}>
      <FaPlusCircle disabled={props.disabled} onClick={props.onClick} />
    </button>
  );
};

export default ButtonCreate;
