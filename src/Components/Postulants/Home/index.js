import styles from './home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/Positions/thunks';

function Home() {
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const [displayedPositions, setDisplayedPositions] = useState([]);
  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
    setDisplayedPositions(positions);
  }, [positions]);
  return (
    <section className={styles.container}>
      <h2>Open Jobs</h2>
      <div className={styles.openJobs}>
        {!displayedPositions.length ? (
          <p className={styles.openJobsP}>There are no open jobs</p>
        ) : (
          displayedPositions.map((p, index) => (
            <div className={styles.openJobsDiv} key={index}>
              <p className={styles.clientName}>{p.client.name}</p>
              <span>{p.professionalProfiles.name}</span>
              <span>{p.jobDescription}</span>
              <span>Vacancies: {p.vacancy}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
