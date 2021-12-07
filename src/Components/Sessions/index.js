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
        return response.json();
      })
      .then(() => {
        getSessions();
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });
  }

  return (
    <div className={styles.container}>
      <Modal
        show={ShowConfirmModal}
        title="Delete Session"
        message="Are you sure you want to delete this Session?"
        onCancel={() => setShowConfirmModal({ show: false, id: '' })}
        onConfirm={deleteSession}
      />
      <section className={styles.section}>
        <h2>Sessions</h2>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>Postulant</th>
              <th className={styles.th}>Psychologist</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Sessions.map((session) => {
              return (
                <Session
                  key={session._id}
                  id={session._id}
                  postulant={
                    session.postulant
                      ? `${session.postulant.firstName} ${session.postulant.lastName}`
                      : 'Unassigned'
                  }
                  psychologist={
                    session.psychologist
                      ? `${session.psychologist.firstName} ${session.psychologist.lastName}`
                      : 'Unassigned'
                  }
                  status={session.status}
                  date={session.date}
                  onDelete={() => setShowConfirmModal({ show: true, id: session._id })}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <Link to="sessions/form">
        <ButtonCreate disabled={isLoading} />
      </Link>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </div>
  );
}

export default Sessions;
