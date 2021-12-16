import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSessions, deleteSession } from '../../redux/Sessions/thunks';
import { closeErrorModal } from '../../redux/Sessions/actions';
import styles from './sessions.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import ModalDelete from '../Shared/Modals/ModalDelete';
import ModalError from '../Shared/Modals/ModalError';

function Sessions() {
  const history = useHistory();

  const dispatch = useDispatch();

  const sessions = useSelector((store) => store.sessions.list);

  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);

  const [selectedSession, setSelectedSession] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    }
  }, [sessions]);

  const handleDelete = (event, session) => {
    event.stopPropagation();
    setSelectedSession(session._id);
    setShowDelete(true);
  };

  return (
    <section className={styles.section}>
      <ModalDelete
        show={showDelete}
        title="Delete Session"
        message="Are you sure you want to delete this Session?"
        onConfirm={() => {
          dispatch(deleteSession(selectedSession)).then(() => {
            setSelectedSession(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sessions</h2>
          <ButtonCreate disabled={isLoading} onClick={() => history.push('/sessions/form')} />
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
                <tr className={styles.list} key={session._id}>
                  <td>
                    {session.postulant.firstName} {session.postulant.lastName}
                  </td>
                  <td>
                    {session.psychologist.firstName} {session.psychologist.lastName}
                  </td>
                  <td>{session.status}</td>
                  <td>{session.date.replace('T', ' ')}</td>
                  <td>{session.notes}</td>
                  <td>
                    <ButtonUpdate
                      disabled={isLoading}
                      onClick={() => history.push(`/sessions/form?_id=${session._id}`)}
                    />
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, session)}
                    />
                  </td>
                </tr>
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
