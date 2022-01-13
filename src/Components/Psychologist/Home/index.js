import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, deleteSession } from 'redux/Sessions/thunks';
import { closeErrorModal } from 'redux/Sessions/actions';
import styles from './home.module.css';
import ButtonDelete from 'Components/Shared/Buttons/ButtonDelete';
import ModalDelete from 'Components/Shared/Modals/ModalDelete';
import ModalError from 'Components/Shared/Modals/ModalError';

function Home() {
  const dispatch = useDispatch();
  const loggedUserId = useSelector((store) => store.auth.authenticated.id);
  const sessions = useSelector((store) => store.sessions.list);
  const [filter, setFilter] = useState('assigned');
  const [selectedSession, setSelectedSession] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const error = useSelector((store) => store.sessions.error);

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
          <div>
            <label htmlFor="Filter">Filter Sessions:</label>
            <select
              className={styles.select}
              name="Filter"
              id="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="assigned">Assigned</option>
              <option value="cancelled">Cancelled</option>
              <option value="succesful">Succesful</option>
            </select>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Postulant</th>
              <th>Status</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              if (session.psychologist._id === loggedUserId && session.status === filter) {
                return (
                  <tr className={styles.list} key={session._id}>
                    <td>
                      {session.postulant.firstName} {session.postulant.lastName}
                    </td>
                    <td>{session.status}</td>
                    <td>{session.date.replace('T', ' ')}</td>
                    <td>{session.notes}</td>
                    <td>
                      <ButtonDelete
                        disabled={isLoading}
                        onClick={(event) => handleDelete(event, session)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Home;
