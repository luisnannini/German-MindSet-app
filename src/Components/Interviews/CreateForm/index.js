import React, { useState } from 'react';
import styles from './createform.module.css';
import Input from '../Inputs';

const CreateForm = (props) => {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');

  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.form}>
      <h2>Create Interview</h2>
      <h3>Postulant</h3>
      <div className={styles.formDiv}>
        <label>First Name</label>
        <Input
          name="firstName"
          value={firstNameValue}
          placeholder="First Name"
          onChange={(e) => {
            setFirstNameValue(e.target.value);
          }}
          required
        />
        <label>Last Name</label>
        <Input
          name="lastName"
          value={lastNameValue}
          placeholder="Last Name"
          onChange={(e) => {
            setLastNameValue(e.target.value);
          }}
          required
        />
      </div>
      <h3>Client</h3>
      <div className={styles.formDiv}>
        <label>Name</label>
        <Input
          name="name"
          value={nameValue}
          placeholder="Name"
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          required
        />
        <label>Status</label>
        <Input
          name="status"
          value={statusValue}
          placeholder="Status"
          onChange={(e) => {
            setStatusValue(e.target.value);
          }}
          required
        />
      </div>
      <div className={styles.formDiv}>
        <label>Date</label>
        <Input
          name="date"
          value={dateValue}
          placeholder="Date"
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
          required
        />
        <label>Notes</label>
        <Input
          name="notes"
          value={notesValue}
          placeholder="Notes"
          onChange={(e) => {
            setNotesValue(e.target.value);
          }}
        />
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={props.closeCreateForm}>
          Cancel
        </button>
        <button className={styles.confirm} onClick={props.confirmCreateForm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
