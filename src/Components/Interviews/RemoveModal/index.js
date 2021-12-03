import React from 'react';
import styles from './removemodal.module.css';

const RemoveModal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <h2>Remove</h2>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={props.closeRemoveModal}>
          Cancel
        </button>
        <button className={styles.confirm} onClick={props.confirmRemoveModal}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RemoveModal;
