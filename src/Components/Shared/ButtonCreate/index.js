import React from 'react';
import styles from './button.module.css';
import create from './create.png';

const ButtonCreate = (props) => {
  return (
    <img
      src={create}
      disabled={props.disabled}
      onClick={props.onClick}
      className={styles.button}
      alt="Create Button"
    ></img>
  );
};

export default ButtonCreate;
