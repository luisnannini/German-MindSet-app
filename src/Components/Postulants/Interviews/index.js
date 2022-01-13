import styles from './interviews.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews } from 'redux/Interviews/thunks';

function Interviews() {
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, [interviews]);
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Interviews</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Business</th>
            <th>Status</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => {
            return (
              <tr className={styles.list} key={interview._id}>
                <td>{interview.client.name}</td>
                <td>{interview.status}</td>
                <td>{interview.date.replace('T', ' ')}</td>
                <td>{interview.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Interviews;
