import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import styles from './buttonCreate.module.css';

const ButtonCreate = (props) => {
  return (
    <button className={styles.button}>
      <BsFillPlusCircleFill onClick={props.onClick} disabled={props.disabled} />
    </button>
  );
};

export default ButtonCreate;
