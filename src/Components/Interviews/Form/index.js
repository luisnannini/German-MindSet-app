import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../Inputs';
import SelectPostulant from '../SelectPostulant';
import SelectClient from '../SelectClient';
import SelectApplication from '../SelectApplication';
import { Link } from 'react-router-dom';
import ModalError from '../../Shared/Modal-Error/modal-error';

const Form = () => {
  const [clients, setClients] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [applications, setApplications] = useState([]);
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [interviewId, setInterviewId] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interviewId = params.get('id');
    setInterviewId(interviewId);
    if (interviewId) {
      fetch(`${process.env.REACT_APP_API}/interviews?_id=${interviewId}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
            const status = `${response.status} ${response.statusText}`;
            return response.json().then(({ message }) => {
              if (message.message) throw { message: message.message, status };
              throw { message, status };
            });
          }
          return response.json();
        })
        .then((response) => {
          if (!response.data[0]) {
            return setError({
              show: true,
              message: 'Interview not found',
              title: '404: Not Found'
            });
          }
          setPostulantValue(response.data[0].postulant?._id);
          setClientValue(response.data[0].client?._id);
          setApplicationValue(response.data[0].application?._id);
          setDateValue(response.data[0].date);
          setStatusValue(response.data[0].status);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let url;
    const params = new URLSearchParams(window.location.search);
    const interviewId = params.get('id');

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
        date: dateValue.replace('T00:00:00.000Z', ''),
        notes: notesValue
      })
    };

    if (interviewId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/interviews/${interviewId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/interviews`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/interviews';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });
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

  const onChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const [errorDate, setErrorDate] = useState(null);

  function handleChangeDate(event) {
    const value = event.target.value;
    if (
      !value.match(
        /(^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([0-5][0-9]):([0-5][0-9])((:[0-5][0-9].\d{3}Z)?)$)|(^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$)/
      )
    )
      setErrorDate('Date must be yyyy-mm-dd');
    else setErrorDate(null);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <h2 className={styles.title}>
        {interviewId ? 'Update an Interview' : 'Create an Interview'}
      </h2>
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
        <select
          className={styles.select}
          value={statusValue}
          onChange={onChangeStatusValue}
          required
        >
          <option value=""></option>
          <option value="failed">Failed</option>
          <option value="assigned">Assigned</option>
          <option value="successful">Successful</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <h3>Date</h3>
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
      <label className={styles.formLabel} htmlFor="messageDate">
        {errorDate}
      </label>
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
        <Link to="/interviews">
          <button className={styles.cancel}>Cancel</button>
        </Link>
        <button type="submit" className={styles.confirm}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Form;
