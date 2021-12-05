import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import styles from './sessions.module.css';
import Session from './Session';
import Modal from '../Shared/Modal';

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
    <div className={styles.container}>
      {ShowConfirmModal.show && (
        <Modal
          show={ShowConfirmModal}
          title="Delete Session"
          message="Are you sure you want to delete this Session?"
          onCancel={() => setShowConfirmModal({ show: false, id: '' })}
          onConfirm={deleteSession}
        />
      )}
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
                  onEdit={() => showForm(session)}
                />
              );
            })}
          </tbody>
        </table>
      </section>
      <>
        <Link to="sessions/form">
          <button disabled={isLoading} className={styles.addButton}>
            <FaPlusCircle />
          </button>
        </Link>
      </>
      {error.isError && <div>{error.message}</div>}
    </div>
  );
}

export default Sessions;
