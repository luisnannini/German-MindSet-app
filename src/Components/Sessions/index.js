import { useEffect, useState } from 'react';
import styles from './sessions.module.css';
import Header from './Header';
import Session from './Session';
import ListHeader from './ListHeader';
import CreateButton from './CreateButton';
import ConfirmModal from './ConfirmModal';
import CreateModal from './CreateModal';

function Sessions() {
  const [Sessions, setSessions] = useState([]);
  const [ShowConfirmModal, setShowConfirmModal] = useState({
    show: false,
    session: {}
  });
  const [ShowCreateModal, setShowCreateModal] = useState(false);

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

  function deleteSession() {
    setShowConfirmModal({ show: false });
    fetch(`${process.env.REACT_APP_API}/sessions/${ShowConfirmModal.id}`, {
      method: 'DELETE'
    }).then(() => {
      getSessions();
    });
  }

  return (
    <div className={styles.container}>
      {ShowConfirmModal.show && (
        <ConfirmModal
          onClose={() => setShowConfirmModal({ show: false, id: '' })}
          onDelete={deleteSession}
        />
      )}
      {ShowCreateModal && <CreateModal onCancel={() => setShowCreateModal(false)} />}
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
      <>
        <CreateButton onCreate={() => setShowCreateModal(true)} />
      </>
    </div>
  );
}

export default Sessions;
