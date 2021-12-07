import styles from './form.module.css';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ModalError from '../../Shared/Modal-Error/modal-error';

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
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
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
            value: psychologist._id,
            label: `${psychologist.firstName} ${psychologist.lastName}`
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
        <FaTimes onClick={closeForm} />
      </div>
      <form onSubmit={onSubmit} className={styles.createForm}>
        <div className={styles.inputContainer}>
          <Select
            className={styles.select}
            name="Postulant"
            value={postulantValue}
            onChange={(e) => setPostulantValue(e.target.value)}
            options={postulants}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <Select
            className={styles.select}
            name="Psychologist"
            value={psychologistValue}
            onChange={(e) => setPsychologistValue(e.target.value)}
            options={psychologists}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <Select
            className={styles.select}
            name="status"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            options={[
              { value: 'assigned', label: 'Assigned' },
              { value: 'succesful', label: 'Succesful' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            name="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            type="datetime-local"
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextArea
            name="notes"
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="submit">
            <button className={styles.submitBtn} type="submit">
              {title}
            </button>
          </label>
        </div>
      </form>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </div>
  );
};

export default Form;
