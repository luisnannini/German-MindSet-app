import React, { useState, useEffect } from 'react';
import styles from './createform.module.css';
import Input from '../Inputs';
import SelectPostulant from '../SelectPostulant';
import SelectClient from '../SelectClient';
import SelectApplication from '../SelectApplication';

const CreateForm = (props) => {
  const [clients, setClients] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [applications, setApplications] = useState([]);
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      });
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postulant: postulantValue,
        client: clientValue,
        application: applicationValue,
        status: statusValue,
        date: dateValue,
        notes: notesValue
      })
    };

    const url = `${process.env.REACT_APP_API}/interviews/`;

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/interviews';
      });
  };

  const onChangeClientValue = (event) => {
    console.log(clientValue);
    setClientValue(event.target.value);
  };

  const onChangePostulantValue = (event) => {
    console.log(postulantValue);
    setPostulantValue(event.target.value);
  };

  const onChangeApplicationValue = (event) => {
    console.log(applicationValue);
    setApplicationValue(event.target.value);
  };

  if (!props.show) {
    return null;
  }
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>Create Interview</h2>
      <div className={styles.formDiv1}>
        <div className={styles.formDiv2}>
          <h3>Postulant</h3>
          <SelectPostulant object={postulants} onChange={onChangePostulantValue} required />
        </div>
        <div className={styles.formDiv2}>
          <h3>Client</h3>
          <SelectClient object={clients} onChange={onChangeClientValue} required />
        </div>
        <div className={styles.formDiv2}>
          <h3>Application</h3>
          <SelectApplication object={applications} onChange={onChangeApplicationValue} required />
        </div>
      </div>
      <div className={styles.formDiv1}>
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
        <label>Date</label>
        <Input
          name="date"
          value={dateValue}
          placeholder="yyyy-mm-dd"
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
          required
        />
      </div>
      <div className={styles.formDiv2}>
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
