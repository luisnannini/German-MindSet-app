import { useEffect, useState } from 'react';
import styles from './sessions.module.css';
import Header from './Header';
import Session from './Session';
import ListHeader from './ListHeader';
import ConfirmModal from './ConfirmModal';

function Sessions() {
  const [Sessions, setSessions] = useState([]);
  const [ShowConfirmModal, setShowConfirmModal] = useState({
    show: false,
    session: {}
  });

  useEffect(() => {
    getSessions();
  }, []);

  function getSessions() {
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => response.json())
      .then((response) => {
        setSessions(response.data);
      });
  }

  return (
    <div className={styles.container}>
      {ShowConfirmModal.show && (
        <ConfirmModal onClose={() => setShowConfirmModal({ show: false, id: '' })} />
      )}
      <section>
        <Header />
        <table>
          <ListHeader />
          <tbody>
            {Sessions.map((session) => {
              return (
                <Session
                  key={session._id}
                  id={session._id}
                  postulant={`${session.postulant.firstName} ${session.postulant.lastName}`}
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
    </div>
  );
}

export default Sessions;
