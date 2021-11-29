import { useEffect, useState } from 'react';
import styles from './sessions.module.css';
import Header from './Header';
import Session from './Session';
import ListHeader from './ListHeader';

function Sessions() {
  const [Sessions, setSessions] = useState([]);

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
