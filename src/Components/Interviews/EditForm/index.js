import React, { useEffect, useState } from 'react';
import styles from './editform.module.css';
import SelectClient from '../SelectClient';
import SelectPostulant from '../SelectPostulant';
import SelectApplication from '../SelectApplication';
import Input from '../Inputs';
import Modal from '../Modal';

function EditForm(props) {
  const [clients, setClients] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [applications, setApplications] = useState([]);
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showErrorUpdate, setShowErrorUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => error);
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
        .catch((error) => {
          setShowErrorUpdate(true);
          setErrorUpdate(error.toString());
        });
    }
  }, []);

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangePostulantValue = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangeApplicationValue = (event) => {
    setApplicationValue(event.target.value);
  };

  const closeModalSuccess = () => {
    setShowSuccessUpdate(false);
    setShowErrorUpdate(false);
    window.location.href = '/interviews';
  };

  const closeModalError = () => {
    setShowSuccessUpdate(false);
    setShowErrorUpdate(false);
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
        date: dateValue.replace('T00:00:00.000Z', ''),
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
        setShowSuccessUpdate(true);
      })
      .catch((error) => {
        setShowErrorUpdate(true);
        setErrorUpdate(error.toString());
      });
  };

  const [errorDate, setErrorDate] = useState(null);

  function handleChangeDate(event) {
    const value = event.target.value;
    if (!value || value.includes('T00:00:00.000Z')) setErrorDate('Date must be yyyy-mm-dd');
    else setErrorDate(null);
  }

  const onChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  return (
    <form key={props._id} className={styles.form} onSubmit={onSubmit}>
      <Modal
        show={showSuccessUpdate}
        title="Successful"
        message={'Interview Updated successfully'}
        onCancel={closeModalSuccess}
      />
      <Modal
        show={showErrorUpdate}
        title="Error"
        message={errorUpdate}
        onCancel={closeModalError}
      />
      <h2>Edit Interview</h2>
      <div className={styles.formDiv1}>
        <div className={styles.formDiv2}>
          <h3>Postulant</h3>
          <SelectPostulant
            value={postulantValue}
            object={postulants}
            onChange={onChangePostulantValue}
            required
          />
        </div>
        <div className={styles.formDiv2}>
          <h3>Client</h3>
          <SelectClient
            value={clientValue}
            object={clients}
            onChange={onChangeClientValue}
            required
          />
        </div>
        <div className={styles.formDiv2}>
          <h3>Application</h3>
          <SelectApplication
            value={applicationValue}
            object={applications}
            onChange={onChangeApplicationValue}
            required
          />
        </div>
      </div>
      <div className={styles.formDiv1}>
        <h3>Status</h3>
        <select onChange={onChangeStatusValue} value={statusValue}>
          <option selected value="0"></option>
          <option value="failed">Failed</option>
          <option value="assigned">Assigned</option>
          <option value="successful">Successful</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <h3>Date</h3>
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
        <label className={styles.formLabel} htmlFor="messageDate">
          {errorDate}
        </label>
      </div>
      <div className={styles.formDiv2}>
        <h3>Notes</h3>
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
        <button type="submit" className={styles.confirm}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default EditForm;
