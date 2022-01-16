import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSession, getSessionById, getSessions, updateSession } from 'redux/Sessions/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import { getPsychologists } from 'redux/Psychologists/thunks';
import { closeErrorModal, clearSelectedItem } from 'redux/Sessions/actions';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery.js';
import styles from './form.module.css';
import Select from 'Components/Shared/Select';
import Input from 'Components/Shared/Input';
import TextArea from 'Components/Shared/TextArea';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';

const SessionsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState(undefined);
  const [title, setTitle] = useState('');
  const postulants = useSelector((store) => store.postulants.list);
  const psychologists = useSelector((store) => store.psychologists.list);
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);
  const query = useQuery();

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getPsychologists());
    const sessionId = query.get('_id');
    sessionId ? setTitle('Update') : setTitle('Create');
    if (sessionId) {
      dispatch(getSessionById(sessionId)).then((selectedSession) => {
        setSessionId(sessionId);
        setPostulantValue(selectedSession.postulant?._id);
        setPsychologistValue(selectedSession.psychologist?._id);
        setStatusValue(selectedSession.status);
        setDateValue(selectedSession.date);
        setNotesValue(selectedSession.notes);
      });
    } else {
      dispatch(clearSelectedItem());
    }
  }, []);

  const submitSession = (formValues) => {
    const sessionId = query.get('_id');

    const dataValues = {
      postulant: formValues.postulant,
      psychologist: formValues.psychologist,
      status: formValues.status,
      date: formValues.date,
      notes: formValues.notes
    };

    if (sessionId) {
      dispatch(updateSession(sessionId, dataValues)).then((response) => {
        if (response) {
          history.push('/admin/sessions');
          dispatch(getSessions());
        }
      });
    } else {
      dispatch(createSession(dataValues)).then((response) => {
        if (response) {
          history.push('/admin/sessions');
          dispatch(getSessions());
        }
      });
    }
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form onSubmit={submitSession}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>{sessionId ? title : 'Create '} Session</h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  className={styles.select}
                  name="postulant"
                  label="Postulant:"
                  title="Postulant"
                  initialValue={postulantValue}
                  object={postulants.map((p) => ({
                    _id: p._id,
                    name: `${p.firstName} ${p.lastName}`
                  }))}
                  disabled={formProps.submitting}
                  component={Select}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  name="psychologist"
                  label="Psychologist:"
                  title="Psychologist"
                  initialValue={psychologistValue}
                  object={psychologists.map((p) => ({
                    _id: p._id,
                    name: `${p.firstName} ${p.lastName}`
                  }))}
                  disabled={formProps.submitting}
                  component={Select}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label="Status:"
                  name="status"
                  title="Status"
                  initialValue={statusValue}
                  object={[
                    { _id: 'assigned', value: 'assigned', name: 'Assigned' },
                    { _id: 'successful', value: 'successful', name: 'Successful' },
                    { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' }
                  ]}
                  disabled={formProps.submitting}
                  component={Select}
                  validate={required}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  label={'Date'}
                  name={'date'}
                  type={'datetime-local'}
                  initialValue={dateValue}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label="Notes"
                  name="notes"
                  initialValue={notesValue}
                  placeholder="Notes"
                  disabled={formProps.submitting}
                  component={TextArea}
                />
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel disabled={isLoading} onClick={() => history.push('/admin/sessions')} />
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="submit">
                  <ButtonConfirm
                    disabled={formProps.submitting || formProps.pristine}
                    type="submit"
                    name={title}
                  />
                </label>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default SessionsForm;
