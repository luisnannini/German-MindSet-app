import styles from './sessions.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions } from 'redux/Sessions/thunks';

function Session() {
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions.list);
  const postulantId = useSelector((store) => store.auth.data._id);
  const postulant = useSelector((store) => store.auth.data);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    }
  }, [sessions]);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>Status of your session with the psychologist:</h1>
        {sessions.map((session) => {
          if (postulantId === session.postulant._id) {
            return (
              <div className={styles.sessionDiv} key={session._id}>
                {session.status === 'assigned' && (
                  <p>
                    {postulant.firstName} {postulant.lastName}: Your session is assigned for the
                    following date: {session.date.replace('T', ' ')}
                  </p>
                )}
                {session.status === 'successful' && (
                  <p>
                    {postulant.firstName} {postulant.lastName}: Your session has already passed !
                    You are enabled to the Interviews section so you can apply for open positions.
                  </p>
                )}
                {session.status === 'cancelled' && (
                  <p>
                    {postulant.firstName} {postulant.lastName}: Your session was cancelled.
                  </p>
                )}
                {session.status != 'assigned' ||
                  session.status != 'successful' ||
                  (session.status != 'cancelled' && (
                    <p>
                      {postulant.firstName} {postulant.lastName}: You still not have any pending
                      Session.
                    </p>
                  ))}
              </div>
            );
          }
        })}
      </section>
    </div>
  );
}

export default Session;
