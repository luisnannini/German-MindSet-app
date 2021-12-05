import React from 'react';
import styles from './buttonUpdate.module.css';
import { FaPen } from 'react-icons/fa';

const ButtonUpdate = (props) => {
  return <FaPen onClick={props.onClick} className={styles.update} />;
};

export default ButtonUpdate;
