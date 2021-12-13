import styles from './postulants.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';
import Postulant from './Postulant';
import CreateButton from '../Shared/Buttons/ButtonCreate';

const Postulants = () => {
  const [postulants, setPostulants] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  useEffect(() => {
    getPostulants();
  }, []);

  function getPostulants() {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((error) => {
        setError({ isError: true, message: error.message.toString() });
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>Postulants</h2>
          <Link to="postulants/form">
            <CreateButton></CreateButton>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Age</th>
              <th className={styles.th}>Address</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Profiles</th>
              <th className={styles.th}>See Profile & CV</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postulants.map((postulant) => {
              return (
                <Postulant
                  key={postulant._id}
                  id={postulant._id}
                  name={`${postulant.firstName} ${postulant.lastName}`}
                  age={postulant.birthday}
                  address={postulant.address}
                  status={postulant.available}
                  profiles={postulant.profiles}
                  onDelete={() => console.log(`delete ${postulant._id}`)}
                  onEdit={() => console.log(`edit ${postulant._id}`)}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Postulants;
