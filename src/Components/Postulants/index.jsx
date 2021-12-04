import styles from './postulants.module.css';
import { useEffect, useState } from 'react';
import Items from './Items.jsx';

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
        <button
          onClick={() => (window.location.href = `${window.location.origin}/postulants-form`)}
        >
          Add
        </button>
      </div>
    </section>
  );
}

export default Postulants;
