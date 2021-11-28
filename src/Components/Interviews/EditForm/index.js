import React from 'react';
import styles from './editform.module.css';
import Input from '../Inputs';

const EditForm = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.form}>
      <h2>Edit</h2>
      <div>
        <h3>Postulant</h3>
        <label>First Name</label>
        <Input
        // name="firstName"
        // value={firstNameValue}
        // placeholder="First Name"
        // onChange={onChangeFirstName}
        // required
        />
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
