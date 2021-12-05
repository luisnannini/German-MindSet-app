import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import Items from './Items.jsx';
import ButtonCreate from '../Shared/ButtonCreate';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const url = `${process.env.REACT_APP_API}/postulants`;
  const getPostulants = async () => {
    const responseRaw = await fetch(url);
    const responseJson = await responseRaw.json();
    return responseJson.data;
  };
  const usePostulants = async () => {
    const formPostulants = await getPostulants();
    setPostulants(formPostulants);
  };
  useEffect(() => {
    usePostulants();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <Items
        url={url}
        postulants={postulants.map((postulant) => {
          return (postulant = {
            _id: postulant._id,
            firstName: postulant.firstName,
            lastName: postulant.lastName,
            email: postulant.email,
            phone: postulant.phone,
            available: postulant.available
          });
        })}
        fetchData={usePostulants}
      />
      <div>
        <Link to="/postulants/form">
          <ButtonCreate />
        </Link>
      </div>
    </section>
  );
}

export default Postulants;
