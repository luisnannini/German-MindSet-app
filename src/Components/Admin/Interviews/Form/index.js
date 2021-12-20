import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createInterview,
  updateInterview,
  getInterviewById,
  getInterviews
} from '../../../../redux/Interviews/thunks';
import { closeErrorModal } from '../../../../redux/Interviews/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../../Hooks/useQuery.js';
import styles from './form.module.css';
import Select from '../../../Shared/Select';
import Input from '../../../Shared/Input';
import TextArea from '../../../Shared/TextArea';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';
import { Form, Field } from 'react-final-form';

const InterviewsForm = () => {
  const history = useHistory();
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

  const submitInterview = (formValues) => {
    const interviewId = query.get('_id');
    setLoading(true);

    const dataValues = {
      postulant: formValues.postulant,
      client: formValues.client,
      application: formValues.application,
      status: formValues.status,
      date: formValues.date,
      notes: formValues.notes
    };
    if (interviewId) {
      dispatch(updateInterview(interviewId, dataValues)).then((response) => {
        if (response) {
          history.push('/admin/interviews');
          dispatch(getInterviews());
        }
      });
    } else {
      dispatch(createInterview(dataValues)).then((response) => {
        if (response) {
          history.push('/admin/interviews');
          dispatch(getInterviews());
        }
      });
    }
  };

  const result = [
    { _id: 'assigned', value: 'assigned', name: 'Assigned' },
    { _id: 'successful', value: 'successful', name: 'Successful' },
    { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' },
    { _id: 'failed', value: 'failed', name: 'Failed' },
    { _id: 'confirmed', value: 'confirmed', name: 'Confirmed' }
  ];

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form onSubmit={submitInterview}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>{id ? 'Update an Interview' : 'Create an Interview'}</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  className={styles.select}
                  label="Postulant Name"
                  title="Postulant Name"
                  name="postulant"
                  initialValue={postulantValue}
                  object={postulants}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label="Client Name"
                  title="Client Name"
                  name="client"
                  initialValue={clientValue}
                  object={clients}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label="Application"
                  title="Application Id"
                  name="application"
                  initialValue={applicationValue}
                  object={applications}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  className={styles.select}
                  label="Status"
                  title="Status"
                  name="status"
                  initialValue={statusValue}
                  object={result}
                  component={Select}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label={'Date'}
                  name="date"
                  type={'datetime-local'}
                  component={Input}
                  initialValue={dateValue}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  name="notes"
                  label="Notes"
                  initialValue={notesValue}
                  component={TextArea}
                  placeholder="Notes"
                  disabled={formProps.submitting}
                />
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={isLoading}
                onClick={() => history.push('/admin/interviews')}
              />
              <ButtonConfirm type="submit" disabled={isLoading} />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
};

export default InterviewsForm;
