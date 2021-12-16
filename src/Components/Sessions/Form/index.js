import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSession,
  getSessionById,
  getSessions,
  updateSession
} from '../../../redux/Sessions/thunks';
import { getPostulants } from '../../../redux/Postulants/thunks';
import { getPsychologists } from '../../../redux/Psychologists/thunks';
import { closeErrorModal } from '../../../redux/Sessions/actions';
import useQuery from '../../../Hooks/useQuery.js';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import TextArea from '../../Shared/TextArea';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/Modals/ModalError';

const Form = () => {
  const history = useHistory();

  const query = useQuery();

  const dispatch = useDispatch();

  const postulants = useSelector((store) => store.postulants.list);
  const psychologists = useSelector((store) => store.psychologists.list);

  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);

  const [sessionId, setSessionId] = useState(undefined);
  const [title, setTitle] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');

  useEffect(() => {
    const sessionId = query.get('_id');
    if (!postulants.length) {
      dispatch(getPostulants());
    }
    if (!psychologists.length) {
      dispatch(getPsychologists());
    }
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
    }
  }, [postulants, psychologists]);

  const submitSession = (event) => {
    event.preventDefault();
    const sessionId = query.get('_id');

    const dataValues = {
      postulant: postulantValue,
      psychologist: psychologistValue,
      status: statusValue,
      date: dateValue,
      notes: notesValue
    };

    if (sessionId) {
      dispatch(updateSession(sessionId, dataValues)).then((response) => {
        if (response) {
          history.push('/sessions');
          dispatch(getSessions());
        }
      });
    } else {
      dispatch(createSession(dataValues)).then((response) => {
        if (response) {
          history.push('/sessions');
          dispatch(getSessions());
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitSession}>
        <div className={styles.header}>
          <h2 className={styles.title}>{sessionId ? title : 'Create '} Session</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              className={styles.select}
              label="Postulant:"
              title="Postulant"
              value={postulantValue}
              object={postulants}
              onChange={(e) => setPostulantValue(e.target.value)}
              required
              disabled={isLoading}
            />
            <Select
              className={styles.select}
              label="Psychologist:"
              title="Psychologist"
              value={psychologistValue}
              object={psychologists}
              onChange={(e) => setPsychologistValue(e.target.value)}
              required
              disabled={isLoading}
            />
            <Select
              className={styles.select}
              label="Status:"
              name="status"
              title="Status"
              value={statusValue}
              object={[
                { _id: 'assigned', value: 'assigned', name: 'Assigned' },
                { _id: 'successful', value: 'successful', name: 'Successful' },
                { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' }
              ]}
              onChange={(e) => setStatusValue(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Date'}
              name={'date'}
              type={'datetime-local'}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              required={true}
              disabled={isLoading}
            />
            <TextArea
              label="Notes"
              name="notes"
              value={notesValue}
              placeholder="Notes"
              onChange={(e) => setNotesValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/sessions')} />
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="submit">
              <ButtonConfirm disabled={isLoading} type="submit" name={title} />
            </label>
          </div>
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
