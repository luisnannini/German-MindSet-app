import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import TextArea from '../../Shared/TextArea';
import ModalError from '../../Shared/ModalError';
import Select from '../../Shared/Select';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import { useLocation } from 'react-router';

const Form = () => {
  const {
    state: { postulant, psychologist, status, date, notes }
  } = useLocation();
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState({
    show: false,
    title: '',
    message: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('Create');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');
    if (sessionId) {
      setTitle('Update');
      setDateValue(date);
      setPostulantValue(postulant);
      setPsychologistValue(psychologist);
      setStatusValue(status);
      setNotesValue(notes);
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
        if (!response.data[0]) {
          return setError({
            show: true,
            message: 'Postulant not found',
            title: '404: Not Found'
          });
        }
        setPostulants(
          response.data.map((postulant) => ({
            _id: postulant._id,
            value: postulant._id,
            name: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });

    fetch(`${process.env.REACT_APP_API}/psychologists`)
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
            message: 'Psychologist not found',
            title: '404: Not Found'
          });
        }
        setPsychologists(
          response.data.map((psychologist) => ({
            _id: psychologist._id,
            value: psychologist._id,
            name: `${psychologist.firstName} ${psychologist.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateValue,
        postulant: postulantValue,
        psychologist: psychologistValue,
        status: statusValue,
        notes: notesValue
      })
    };

    if (sessionId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/sessions/${sessionId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/sessions`;
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
        window.location.href = '/sessions';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  const closeForm = () => {
    window.location.href = '/sessions';
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title} Session</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              className={styles.select}
              label="Postulant:"
              value={postulantValue}
              onChange={(e) => setPostulantValue(e.target.value)}
              object={postulants}
              required
              disabled={isLoading}
              title="Postulant"
            />
            <Select
              className={styles.select}
              value={psychologistValue}
              label="Psychologist:"
              onChange={(e) => setPsychologistValue(e.target.value)}
              object={psychologists}
              required
              disabled={isLoading}
              title="Psychologist"
            />
            <Select
              className={styles.select}
              name="status"
              label="Status:"
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              object={[
                { _id: 'assigned', value: 'assigned', name: 'Assigned' },
                { _id: 'succesful', value: 'succesful', name: 'Successful' },
                { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' }
              ]}
              required
              title="Status"
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Date'}
              type={'datetime-local'}
              value={dateValue}
              name={'date'}
              onChange={(e) => setDateValue(e.target.value)}
              required={true}
              disabled={isLoading}
            />
            <TextArea
              name="notes"
              label="Notes"
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              disabled={isLoading}
              placeholder="Notes"
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={closeForm} />
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="submit">
              <ButtonConfirm disabled={isLoading} type="submit" name={title} />
            </label>
          </div>
        </div>
      </form>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </div>
  );
};

export default Form;
