import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sessions.module.css';
import Session from './Session';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';

function Sessions() {
  const [Sessions, setSessions] = useState([]);
  const [ShowConfirmModal, setShowConfirmModal] = useState({
    show: false,
    session: {},
    id: ''
  });
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getSessions();
  }, []);

  function getSessions() {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
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
        setSessions(response.data);
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  }

  function deleteSession() {
    setShowConfirmModal({ show: false });
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions/${ShowConfirmModal.id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/sessions`)
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
            setSessions(response.data);
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  }

  return (
    <section className={styles.section}>
      <Modal
        show={ShowConfirmModal.show}
        title="Delete Session"
        message="Are you sure you want to delete this Session?"
        onCancel={() => setShowConfirmModal({ show: false, id: '' })}
        onConfirm={deleteSession}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sessions</h2>
          <Link to="sessions/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Postulant</th>
              <th>Psychologist</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Sessions.map((session) => {
              return (
                <Session
                  key={session._id}
                  id={session._id}
                  postulant={session.postulant}
                  psychologist={session.psychologist}
                  notes={session.notes}
                  status={session.status}
                  date={session.date}
                  onDelete={() => setShowConfirmModal({ show: true, id: session._id })}
                  disabled={isLoading}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </section>
  );
}

export default Sessions;
