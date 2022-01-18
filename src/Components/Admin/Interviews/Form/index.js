import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInterview,
  updateInterview,
  getInterviewById,
  getInterviews
} from 'redux/Interviews/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import { getClients } from 'redux/Clients/thunks';
import { getApplications } from 'redux/Applications/thunks';
import { closeErrorModal, clearSelectedInterview } from 'redux/Interviews/actions';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery.js';
import styles from './form.module.css';
import Select from 'Components/Shared/Select';
import Input from 'Components/Shared/Input';
import TextArea from 'Components/Shared/TextArea';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';

const InterviewsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [id, setInterviewId] = useState(undefined);
  const postulants = useSelector((store) => store.postulants.list);
  const clients = useSelector((store) => store.clients.list);
  const applications = useSelector((store) => store.applications.list);
  const [postulantValue, setPostulantValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const error = useSelector((store) => store.positions.error);
  const query = useQuery();

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getClients());
    dispatch(getApplications());
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
    } else {
      dispatch(clearSelectedInterview());
    }
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
                  object={postulants.map((p) => ({
                    _id: p._id,
                    name: `${p.firstName} ${p.lastName}`
                  }))}
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
                  object={applications.map((a) => ({
                    _id: a._id,
                    name: a.result
                  }))}
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
                <span>Notes should have a maximum of 250 characters</span>
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={isLoading}
                onClick={() => history.push('/admin/interviews')}
              />
              <ButtonConfirm type="submit" disabled={formProps.submitting || formProps.pristine} />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
};

export default InterviewsForm;
