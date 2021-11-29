import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const Modal = (props) => {
  return (
    <React.Fragment>
      <div className={props.visible ? '' : styles.hideModal}>
        <div className={styles.container}>
          <div className={styles.form}>
            <div className={styles.header}>
              <h2>Are you sure you want to delete this administrator?</h2>
              <div>{props.admin}</div>
            </div>
            <div className={styles.header}>
              <Button class={styles.greenButton} action={props.action} name={'Confirm'} />
              <Button class={styles.redButton} action={props.cancel} name={'Cancel'} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
