import React from 'react';
import styles from './editform.module.css';

const EditForm = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.form}>
      <h2>Edit</h2>
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
        <button className={styles.cancel} onClick={props.closeEditForm}>
          Cancel
        </button>
        <button className={styles.confirm} onClick={props.confirmEditForm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditForm;
