import React from 'react';
import styles from './removemodal.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

const RemoveModal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <h2>Remove</h2>
      <h3>Are you sure ?</h3>
      <div className={styles.buttons}>
        <ButtonCancel onClick={props.closeRemoveModal} />
        <ButtonConfirm onClick={props.confirmRemoveModal} />
      </div>
    </div>
  );
};

export default RemoveModal;
