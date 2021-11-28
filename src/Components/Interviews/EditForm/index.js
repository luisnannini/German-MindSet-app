import React from 'react';
import styles from './editform.module.css';
import Inputs from '../Inputs';

const EditForm = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.form}>
      <h2>Edit</h2>
      <div>
        <Inputs />
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
