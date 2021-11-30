import React, { useState, useEffect } from 'react';
import styles from './createform.module.css';
import Input from '../Inputs';
import SelectPostulant from '../SelectPostulant';
import SelectClient from '../SelectClient';
import SelectApplication from '../SelectApplication';
import Modal from '../Modal';

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
  const [showSuccessCreate, setShowSuccessCreate] = useState(false);

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
        setShowSuccessCreate(true);
      })
      .then(() => {
        setTimeout(function () {
          if (setShowSuccessCreate) {
            window.location.href = '/interviews';
          }
        }, 2000);
      })
      .catch((error) => error);
  };

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangePostulantValue = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangeApplicationValue = (event) => {
    setApplicationValue(event.target.value);
  };

  const [messageDate, setMessageDate] = useState('');
  const [errorDate, setErrorDate] = useState(null);
  const [messageStatus, setMessageStatus] = useState('');
  const [errorStatus, setErrorStatus] = useState(null);

  function handleChangeDate(event) {
    const value = event.target.value;
    if (!value.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/))
      setErrorDate('Date must be yyyy-mm-dd');
    else setErrorDate(null);
    setMessageDate(value);
  }

  function handleChangeStatus(event) {
    const value = event.target.value;
    if (value !== 'failed' && value !== 'successful' && value !== 'assigned') {
      setErrorStatus('Status must be assigned, successful or failed');
    } else setErrorStatus(null);
    setMessageStatus(value);
  }

  if (!props.show) {
    return null;
  }
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Modal
        show={showSuccessCreate}
        title="Successful"
        message={'Interview Created successfully'}
      />
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
            handleChangeStatus(e);
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
            handleChangeDate(e);
          }}
          required
        />
      </div>
      <div className={styles.formDivError}>
        <label
          style={{ color: 'red', width: '200px', padding: '0px 20px' }}
          htmlFor="messageStatus"
        >
          {errorStatus}
        </label>
        <label
          style={{ color: 'red', width: '200px', padding: '0px 20px', float: 'right' }}
          htmlFor="messageDate"
        >
          {errorDate}
        </label>
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
