import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import TextArea from '../../Shared/TextArea';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

const Form = () => {
  const [title, setTitle] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    title: '',
    message: ''
  });

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
          setPostulantValue(response.data[0].postulant?._id);
          setPsychologistValue(response.data[0].psychologist?._id);
          setStatusValue(response.data[0].status);
          setDateValue(response.data[0].date);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
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

  const submitSession = (event) => {
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
        postulant: postulantValue,
        psychologist: psychologistValue,
        status: statusValue,
        date: dateValue,
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
          <ButtonCancel disabled={isLoading} onClick={closeForm} />
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="submit">
              <ButtonConfirm disabled={isLoading} type="submit" name={title} />
            </label>
          </div>
        </div>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
      </form>
    </div>
  );
};

export default Form;
