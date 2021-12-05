import styles from './form.module.css';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../../Shared/Select';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Form = () => {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState('');
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
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setDateValue(response.data[0].date);
          setPostulantValue(response.data[0].postulant?._id);
          setPsychologistValue(response.data[0].psychologist?._id);
          setStatusValue(response.data[0].status);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => {
          setError(error.toString());
        })
        .finally(() => setLoading(false));
    }

    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
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
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));

    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setPsychologists(
          response.data.map((psychologist) => ({
            _id: psychologist._id,
            value: psychologist._id,
            name: `${psychologist.firstName} ${psychologist.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
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
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/sessions';
      })
      .catch((error) => {
        setError(error.toString());
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
            value={postulantValue}
            onChange={(e) => setPostulantValue(e.target.value)}
            object={postulants}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputContainer}>
          <Select
            className={styles.select}
            value={psychologistValue}
            onChange={(e) => setPsychologistValue(e.target.value)}
            object={psychologists}
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
            object={[
              { _id: 'assigned', value: 'assigned', name: 'Assigned' },
              { _id: 'succesful', value: 'succesful', name: 'Successful' },
              { _id: 'cancelled', value: 'cancelled', name: 'Cancelled' }
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
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
};

export default Form;
