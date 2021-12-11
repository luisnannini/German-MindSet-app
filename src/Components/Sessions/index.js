import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sessions.module.css';
import Session from './Session';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, deleteSession } from '../../redux/Sessions/thunks';
import { closeErrorModal } from '../../redux/Sessions/actions';

function Sessions() {
  const [showDelete, setShowDelete] = useState({
    show: false,
    session: {},
    id: ''
  });

  const dispatch = useDispatch();

  const sessions = useSelector((store) => store.sessions.list);
  const error = useSelector((store) => store.sessions.error);
  const isLoading = useSelector((store) => store.sessions.isLoading);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    }
  }, [sessions]);

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete.show}
        title="Delete Session"
        message="Are you sure you want to delete this Session?"
        onConfirm={() => {
          dispatch(deleteSession(selectedSession)).then(() => {
            setSelectedSession(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete({ show: false, id: '' })}
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
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
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
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
                  date={session.date.replace('T', ' ')}
                  notes={session.notes}
                  onDelete={() => setShowDelete({ show: true, id: session._id })}
                  disabled={isLoading}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Sessions;
