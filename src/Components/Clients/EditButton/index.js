import React from 'react';
import edit from './edit.png';
import styles from './edit.module.css';

const EditButton = ({ onClick }) => {
  return <img className={styles.edit} src={edit} onClick={onClick} />;
};

export default EditButton;
