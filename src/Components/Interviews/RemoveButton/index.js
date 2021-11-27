import React from 'react';
import styles from './removebutton.module.css';
import remove from './remove.png';
import Modal from '../Modal';

const RemoveButton = () => {
  const showModal = () => {
    <Modal />;
    console.log('modal');
  };

  return (
    <button className={styles.button}>
      <img
        src={remove}
        alt="Remove"
        onClick={() => {
          showModal();
        }}
      />
    </button>
  );
};

export default RemoveButton;
