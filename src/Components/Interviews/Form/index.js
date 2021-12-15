import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createInterview,
  updateInterview,
  getInterviewById
} from '../../../redux/Interviews/thunks';
import { closeErrorModal } from '../../../redux/Interviews/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery.js';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

const Form = () => {
  const dispatch = useDispatch();
  const [id, setInterviewId] = useState(undefined);
  const [postulants, setPostulants] = useState([]);
  const [clients, setClients] = useState([]);
  const [applications, setApplications] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const query = useQuery();

  useEffect(() => {
    setLoading(true);
    const interviewId = query.get('_id');
    if (interviewId) {
      dispatch(getInterviewById(interviewId)).then((selectedInterview) => {
        setInterviewId(interviewId);
        setPostulantValue(selectedInterview.postulant?._id);
        setClientValue(selectedInterview.client?._id);
        setApplicationValue(selectedInterview.application?._id);
        setDateValue(selectedInterview.date);
        setStatusValue(selectedInterview.status);
        setNotesValue(selectedInterview.notes);
      });
    }
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
        setPostulants(
          response.data.map((postulant) => ({
            _id: postulant._id,
            value: postulant._id,
            name: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
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
        setApplications(
          response.data.map((application) => ({
            _id: application._id,
            value: application._id,
            name: application.result
          }))
        );
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  }, []);

  const submitInterview = (e) => {
    e.preventDefault();
    const interviewId = query.get('_id');
    setLoading(true);

    const dataValues = {
      postulant: postulantValue,
      client: clientValue,
      application: applicationValue,
      status: statusValue,
      date: dateValue,
      notes: notesValue
    };
    if (interviewId) {
      dispatch(updateInterview(interviewId, dataValues)).then((response) => {
        if (response) {
          history.push('/interviews');
        }
      });
    } else {
      dispatch(createInterview(dataValues)).then((response) => {
        if (response) {
          history.push('/interviews');
        }
      });
    }
  };

  const onChangePostulantValue = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangeApplicationValue = (event) => {
    setApplicationValue(event.target.value);
  };

  const onChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const result = [
    { _id: 'assigned', value: 'assigned', name: 'Assigned' },
    { _id: 'successful', value: 'successful', name: 'Successful' },
    { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' },
    { _id: 'failed', value: 'failed', name: 'Failed' },
    { _id: 'confirmed', value: 'confirmed', name: 'Confirmed' }
  ];

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitInterview}>
        <div className={styles.header}>
          <h2 className={styles.title}>{id ? 'Update an Interview' : 'Create an Interview'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              label="Postulant Name"
              title="Postulant Name"
              value={postulantValue}
              object={postulants}
              onChange={onChangePostulantValue}
              required
              disabled={isLoading}
            />
            <Select
              label="Client Name"
              title="Client Name"
              value={clientValue}
              object={clients}
              onChange={onChangeClientValue}
              required
              disabled={isLoading}
            />
            <Select
              label="Application"
              title="Application Id"
              value={applicationValue}
              object={applications}
              onChange={onChangeApplicationValue}
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Select
              label="Status"
              title="Status"
              value={statusValue}
              object={result}
              onChange={onChangeStatusValue}
              required
              disabled={isLoading}
            />
            <Input
              label={'Date'}
              name={'date'}
              type={'datetime-local'}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              required={true}
              disabled={isLoading}
            />
            <h3>Notes</h3>
            <Input
              name="notes"
              value={notesValue}
              placeholder="Notes"
              onChange={(e) => {
                setNotesValue(e.target.value);
              }}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/interviews')} />
          <ButtonConfirm type="submit" disabled={isLoading} />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
