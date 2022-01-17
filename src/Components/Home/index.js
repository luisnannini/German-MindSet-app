import styles from './home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/Positions/thunks';
import img from 'Images/img-home.jpg';

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
      <img src={img} alt="Img Home"></img>
      <p className={styles.subtitle}>
        We are an HR company that helps you find your next work experience
      </p>
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
