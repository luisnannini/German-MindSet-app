import React from 'react';
import styles from './buttonCreate.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';

const ButtonCreate = (props) => {
  return (
    <button className={styles.button}>
      <BsFillPlusCircleFill disabled={props.disabled} onClick={props.onClick} />
    </button>
  );
};

export default ButtonCreate;
