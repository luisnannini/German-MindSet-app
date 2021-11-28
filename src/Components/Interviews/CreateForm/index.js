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

  const onSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        name: nameValue,
        status: statusValue,
        date: dateValue,
        notes: notesValue
      })
    };

    const url = `${process.env.REACT_APP_API}/interviews/`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };

  if (!props.show) {
    return null;
  }
  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
        <button type="submit" className={styles.confirm}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
