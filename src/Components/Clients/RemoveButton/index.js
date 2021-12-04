import React from 'react';
import remove from './remove.png';
import styles from './remove.module.css';

const RemoveButton = ({ onClick }) => {
  return <img className={styles.remove} onClick={onClick} src={remove}></img>;
};

export default RemoveButton;
