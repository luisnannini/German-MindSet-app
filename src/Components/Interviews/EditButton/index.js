import React from 'react';
import styles from './editbutton.module.css';
import edit from './edit.png';

const EditButton = ({ onClick }) => {
  return (
    <button className={styles.button}>
      <img src={edit} alt="Edit" onClick={onClick} />
    </button>
  );
};

export default EditButton;
