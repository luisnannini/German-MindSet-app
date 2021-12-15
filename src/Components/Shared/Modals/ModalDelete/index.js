import React from 'react';
import styles from './modaldelete.module.css';
import ButtonCancel from '../../Buttons/ButtonCancel';
import ButtonConfirm from '../../Buttons/ButtonConfirm';

const ModalDelete = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.message}>{props.message}</div>
        <div className={styles.btnContainer}>
          <ButtonCancel disabled={props.isLoading} onClick={props.onCancel} />
          <ButtonConfirm disabled={props.isLoading} onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
