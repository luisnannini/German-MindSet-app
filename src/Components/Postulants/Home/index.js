import styles from './home.module.css';
import img from 'Images/img-home.jpg';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPositions } from 'redux/Positions/thunks';

function Home() {
  // const dispatch = useDispatch();
  // const positions = useSelector((store) => store.positions.list);
  // useEffect(() => {
  //   if (!positions.length) {
  //     dispatch(getPositions());
  //   }
  // }, [positions]);
  return (
    <section className={styles.container}>
      <img src={img} alt="Img Home"></img>
      <h2>Open Jobs</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client</th>
            <th>Profiles</th>
            <th>Job Description</th>
            <th>Vacancy</th>
            <th>Is Open</th>
          </tr>
        </thead>
        <tbody>
          {/* {positions.map((position) => {
            return (
              <tr key={position._id}>
                <td>{position.client.name}</td>
                <td>{position.professionalProfiles.name}</td>
                <td>{position.jobDescription}</td>
                <td>{position.vacancy}</td>
                <td>{position.isOpen ? 'Yes' : 'No'}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </section>
  );
}

export default Home;
