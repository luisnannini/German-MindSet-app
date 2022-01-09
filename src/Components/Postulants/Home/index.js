import styles from './home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/Positions/thunks';

function Home() {
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
  }, [positions]);
  return (
    <section className={styles.container}>
      <h2>Open Jobs</h2>
      <div className={styles.openJobs}>
        <p>{positions.isOpen === false && 'No open jobs'}</p>
        {positions.map((position) => {
          if (position.isOpen === true) {
            return (
              <div className={styles.openJobsDiv}>
                <p className={styles.clientName}>{position.client.name}</p>
                <span>{position.professionalProfiles.name}</span>
                <span>{position.jobDescription}</span>
                <span>Vacancies: {position.vacancy}</span>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}

export default Home;
