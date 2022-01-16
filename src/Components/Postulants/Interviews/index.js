import styles from './interviews.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews } from 'redux/Interviews/thunks';

function Interviews() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('true');
  const interviews = useSelector((store) => store.interviews.list);
  const postulantId = useSelector((store) => store.auth.data._id);
  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, [interviews]);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Interviews</h2>
        <div>
          <label htmlFor="Filter">Filter Interviews:</label>
          <select
            className={styles.select}
            name="Filter"
            id="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="true">See All</option>
            <option value="assigned">Assigned</option>
            <option value="cancelled">Cancelled</option>
            <option value="successful">Succesful</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
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
            if (
              postulantId === interview.postulant._id &&
              (filter === 'true' || filter === interview.status)
            ) {
              return (
                <tr className={styles.list} key={interview._id}>
                  <td>{interview.client.name}</td>
                  <td>{interview.status}</td>
                  <td>{interview.date.replace('T', ' ')}</td>
                  <td>{interview.notes}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Interviews;
