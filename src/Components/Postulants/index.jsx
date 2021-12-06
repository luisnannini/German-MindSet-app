import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './postulants.module.css';
import Items from './Items.jsx';
import ModalError from '../Shared/Modal-Error/modal-error';

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const url = `${process.env.REACT_APP_API}/postulants`;
  const getPostulants = async () => {
    try {
      const responseRaw = await fetch(url);
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        const status = `${responseRaw.status} ${responseRaw.statusText}`;
        const { message } = await responseRaw.json();
        if (message.message) throw { message: message.message, status };
        throw { message, status };
      }
      const responseJson = await responseRaw.json();
      return responseJson.data;
    } catch (error) {
      setError({ show: true, message: error.message, title: error.status });
    }
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
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
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
          <button>Add</button>
        </Link>
      </div>
    </section>
  );
}

export default Postulants;
