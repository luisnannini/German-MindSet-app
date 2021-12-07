import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import TextArea from '../TextArea';
import ModalError from '../../Shared/ModalError';
import Select from '../../Shared/Select';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';

const Form = () => {
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
  const [title, setTitle] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');
    sessionId ? setTitle('Update') : setTitle('Create');
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API}/sessions?_id=${sessionId}`)
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
              message: 'Session not found',
              title: '404: Not Found'
            });
          }
          setDateValue(response.data[0].date);
          setPostulantValue(response.data[0].postulant?._id);
          setPsychologistValue(response.data[0].psychologist?._id);
          setStatusValue(response.data[0].status);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        })
        .finally(() => setLoading(false));
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
      })
      .finally(() => setLoading(false));

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
    <div className={styles.formContainer}>
      <div className={styles.modalHeader}>
        <h3>{title} Session</h3>
      </div>
      <form onSubmit={onSubmit} className={styles.createForm}>
        <div className={styles.inputContainer}>
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
        </div>
        <div className={styles.inputContainer}>
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
        </div>
        <div className={styles.inputContainer}>
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
        <Input
          label={'Date'}
          type={'datetime-local'}
          value={dateValue}
          name={'date'}
          onChange={(e) => setDateValue(e.target.value)}
          required={true}
          disabled={isLoading}
        />
        <div className={styles.inputContainer}>
          <TextArea
            name="notes"
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <ButtonCancel onClick={closeForm} />
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="submit">
            <ButtonConfirm type="submit" name={title} />
          </label>
        </div>
      </form>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </div>
  );
};

export default Form;
