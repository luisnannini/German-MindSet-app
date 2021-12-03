import React from 'react';
import create from './create.png';
import styles from './create.module.css';

const AddButton = ({ onClick }) => {
  return <img className={styles.createButton} onClick={onClick} src={create}></img>;
};

export default AddButton;
