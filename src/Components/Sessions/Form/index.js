import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import TextArea from '../../Shared/TextArea';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { createSession, getSessionById, updateSession } from '../../../redux/Sessions/thunks';
import { closeErrorModal } from '../../../redux/Sessions/actions';

const Form = () => {
  const [title, setTitle] = useState('');
  // const [postulants, setPostulants] = useState([]);
  // const [psychologists, setPsychologists] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');

  const error = useSelector((store) => store.profiles.error);
  const isLoading = useSelector((store) => store.profiles.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');
    sessionId ? setTitle('Update') : setTitle('Create');
    if (sessionId) {
      dispatch(getSessionById(sessionId)).then((selectedSession) => {
        setPostulantValue(selectedSession.postulant.firstName, selectedSession.postulant.lastName);
        setPsychologistValue(
          selectedSession.psychologist.firstName,
          selectedSession.psychologist.lastName
        );
        setStatusValue(selectedSession.status);
        setDateValue(selectedSession.date);
        setNotesValue(selectedSession.notes);
      });
    }

    // fetch(`${process.env.REACT_APP_API}/postulants`)
    //   .then((response) => {
    //     if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
    //       const status = `${response.status} ${response.statusText}`;
    //       return response.json().then(({ message }) => {
    //         if (message.message) throw { message: message.message, status };
    //         throw { message, status };
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((response) => {
    //     if (!response.data[0]) {
    //       return setError({
    //         show: true,
    //         message: 'Postulant not found',
    //         title: '404: Not Found'
    //       });
    //     }
    //     setPostulants(
    //       response.data.map((postulant) => ({
    //         _id: postulant._id,
    //         value: postulant._id,
    //         name: `${postulant.firstName} ${postulant.lastName}`
    //       }))
    //     );
    //   })
    //   .catch((error) => {
    //     setError({ show: true, message: error.message, title: error.status });
    //   });

    // fetch(`${process.env.REACT_APP_API}/psychologists`)
    //   .then((response) => {
    //     if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
    //       const status = `${response.status} ${response.statusText}`;
    //       return response.json().then(({ message }) => {
    //         if (message.message) throw { message: message.message, status };
    //         throw { message, status };
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((response) => {
    //     if (!response.data[0]) {
    //       return setError({
    //         show: true,
    //         message: 'Psychologist not found',
    //         title: '404: Not Found'
    //       });
    //     }
    //     setPsychologists(
    //       response.data.map((psychologist) => ({
    //         _id: psychologist._id,
    //         value: psychologist._id,
    //         name: `${psychologist.firstName} ${psychologist.lastName}`
    //       }))
    //     );
    //   })
  }, []);

  const submitSession = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');

    if (sessionId) {
      dispatch(
        updateSession(sessionId, {
          postulantName: postulantValue,
          psychologistName: psychologistValue,
          status: statusValue,
          date: dateValue,
          notes: notesValue
        })
      );
    } else {
      dispatch(
        createSession({
          postulantName: postulantValue,
          psychologistName: psychologistValue,
          status: statusValue,
          date: dateValue,
          notes: notesValue
        })
      );
    }
  };

  //   fetch(url, options)
  //     .then((response) => {
  //       if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
  //         const status = `${response.status} ${response.statusText}`;
  //         return response.json().then(({ message }) => {
  //           if (message.message) throw { message: message.message, status };
  //           throw { message, status };
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       window.location.href = '/sessions';
  //     })
  //     .catch((error) => {
  //       setError({ show: true, message: error.message, title: error.status });
  //     })
  //     .finally(() => setLoading(false));
  // };

  // const closeForm = () => {
  //   window.location.href = '/sessions';
  // };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitSession}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title} Session</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              className={styles.select}
              label="Postulant:"
              title="Postulant"
              value={postulantValue}
              // object={postulants}
              onChange={(e) => setPostulantValue(e.target.value)}
              required
              disabled={isLoading}
            />
            <Select
              className={styles.select}
              label="Psychologist:"
              title="Psychologist"
              value={psychologistValue}
              // object={psychologists}
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
          <ButtonCancel disabled={isLoading} />
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
