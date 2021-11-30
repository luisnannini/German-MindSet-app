import React, { useEffect, useState } from 'react';
import styles from './editform.module.css';
import SelectClient from '../SelectClient';
import SelectPostulant from '../SelectPostulant';
import SelectApplication from '../SelectApplication';
import Input from '../Inputs';

function EditForm(props) {
  const [interviews, setInterviews] = useState([]);
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
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interviewId = params.get('id');
    if (interviewId) {
      fetch(`${process.env.REACT_APP_API}/interviews?_id=${interviewId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setPostulantValue(response.data[0].postulant?._id);
          setClientValue(response.data[0].client?._id);
          setApplicationValue(response.data[0].application?._id);
          setDateValue(response.data[0].date);
          setStatusValue(response.data[0].status);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => error);
    }
  }, []);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const interviewId = params.get('id');

    const options = {
      method: 'PUT',
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

    fetch(`${process.env.REACT_APP_API}/interviews/${interviewId}`, options)
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
      })
      .catch((error) => error);
  };

  // ADD VALIDATIONS
  const [messageDate, setMessageDate] = useState('');
  const [errorDate, setErrorDate] = useState(null);
  const [messageStatus, setMessageStatus] = useState('');
  const [errorStatus, setErrorStatus] = useState(null);

  function handleChangeDate(event) {
    const value = event.target.value;
    if (value.includes('T00:00:00.000Z')) setErrorDate('Date must be yyyy-mm-dd');
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

  return (
    <form key={props._id} className={styles.form} onSubmit={onSubmit}>
      <h2>Edit Interview</h2>
      <div className={styles.formDiv1}>
        <div className={styles.formDiv2}>
          <h3>Postulant</h3>
          <SelectPostulant
            value={postulantValue}
            object={postulants}
            onChange={onChangePostulantValue}
          />
        </div>
        <div className={styles.formDiv2}>
          <h3>Client</h3>
          <SelectClient value={clientValue} object={clients} onChange={onChangeClientValue} />
        </div>
        <div className={styles.formDiv2}>
          <h3>Application</h3>
          <SelectApplication
            value={applicationValue}
            object={applications}
            onChange={onChangeApplicationValue}
          />
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
        <p>yyyy-mm-dd</p>
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
      <div>
        <label
          style={{ color: 'red', width: '200px', textAlign: 'center', padding: '0px 20px' }}
          htmlFor="messageStatus"
        >
          {errorStatus}
        </label>
        <label
          style={{ color: 'red', width: '200px', textAlign: 'center', float: 'right' }}
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
        <button type="submit" className={styles.confirm} onClick={onSubmit}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default EditForm;
