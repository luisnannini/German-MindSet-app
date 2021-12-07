import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sessions.module.css';
import Session from './Session';
import ConfirmModal from './ConfirmModal';
import ButtonCreate from '../Shared/ButtonCreate';

function Sessions() {
  const [Sessions, setSessions] = useState([]);
  const [ShowConfirmModal, setShowConfirmModal] = useState({
    show: false,
    session: {}
  });
  const [error, setError] = useState({
    isError: false,
    message: ''
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getSessions();
  }, []);

  function getSessions() {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        setError({ isError: true, message: error.message.toString() });
      })
      .finally(() => setLoading(false));
  }

  function deleteSession() {
    setShowConfirmModal({ show: false });
    fetch(`${process.env.REACT_APP_API}/sessions/${ShowConfirmModal.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        getSessions();
      })
      .catch((error) => {
        setError({ isError: true, message: error.message.toString() });
      });
  }

  const showForm = (session) => {
    if (session) {
      window.location.href = `sessions/form?id=${session._id}`;
    } else {
      window.location.href = `sessions/form`;
    }
  };

  return (
    <section className={styles.section}>
      {ShowConfirmModal.show && (
        <ConfirmModal
          onClose={() => setShowConfirmModal({ show: false, id: '' })}
          onDelete={deleteSession}
        />
      )}
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
                  onEdit={() => showForm(session)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {error.isError && <div>{error.message}</div>}
    </section>
  );
}

export default Sessions;
