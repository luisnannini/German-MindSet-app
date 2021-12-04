import React from 'react';
import styles from './removebutton.module.css';
import remove from './remove.png';

const RemoveButton = ({ onClick }) => {
  return (
    <button className={styles.button}>
      <img src={remove} alt="Remove" onClick={onClick} />
    </button>
  );
};

export default RemoveButton;
