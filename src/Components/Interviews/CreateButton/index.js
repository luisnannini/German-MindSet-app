import React from 'react';
import styles from './createbutton.module.css';
import create from './create.png';

const CreateButton = ({ onClick }) => {
  return (
    <button className={styles.createButton}>
      <img src={create} alt="Create" onClick={onClick} />
    </button>
  );
};

export default CreateButton;
