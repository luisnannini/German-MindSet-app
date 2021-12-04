import React from 'react';
import styles from './button.module.css';

const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick} className={styles.button}>
      {props.name}
    </button>
  );
};

export default Button;
