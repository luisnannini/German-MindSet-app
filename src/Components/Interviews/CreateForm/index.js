import React from 'react';
import styles from './createform.module.css';

const CreateForm = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.form}>
      <h2>Create Interview</h2>
      <h3>Postulant</h3>
      <div className={styles.divform}>
        <label>First Name</label>
        <input></input>
        <label>Last Name</label>
        <input></input>
      </div>
      <h3>Client</h3>
      <div className={styles.divform}>
        <label>Name</label>
        <input></input>
        <label>Status</label>
        <input></input>
      </div>
      <div className={styles.divform}>
        <label>Date</label>
        <input></input>
        <label>Notes</label>
        <input></input>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={props.closeCreateForm}>
          Cancel interview
        </button>
        <button className={styles.confirm} onClick={props.confirmCreateForm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
