import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './psychologists.module.css';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => savePsychologists(response.data))
      .catch((error) => setError(error.toString()));
  }, []);

  const handleDelete = (event, psy) => {
    event.stopPropagation();
    setShowModalDelete(true);
    setSelectedPsychologist(psy._id);
  };

  const deletePsychologist = () => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${selectedPsychologist}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/psychologists`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then(async (response) => {
            await savePsychologists(response.data);
            await setShowModalDelete(false);
          });
      })
      .catch((error) => setError(error.toString()));
  };

  const closeModal = () => {
    setShowModalDelete(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModalDelete}
        title="Delete Psychologist"
        message="Are you sure you want to delete this Psychologist?"
        onConfirm={deletePsychologist}
        onCancel={closeModal}
      />
      <div>
        <h2 className={styles.title}>Psychologist</h2>
      </div>
      <div>
        <ul className={styles.listHeader}>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Username</li>
          <li>Email</li>
          <li>Phone Number</li>
          <li>Address</li>
          <li>EDIT</li>
          <li>DELETE</li>
        </ul>
      </div>
      <div>
        {psychologists.map((psychologist) => {
          return (
            <ul key={psychologist._id} className={styles.list}>
              <li>{psychologist.firstName}</li>
              <li>{psychologist.lastName}</li>
              <li>{psychologist.username}</li>
              <li>{psychologist.email}</li>
              <li>{psychologist.phone}</li>
              <li>{psychologist.address}</li>
              <li>
                <Link to={`psychologists/form?id=${psychologist._id}`}>
                  <ButtonUpdate />
                </Link>
              </li>
              <li>
                <ButtonDelete onClick={(event) => handleDelete(event, psychologist)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.error}>{error}</div>
      <Link to="./psychologists/form">
        <ButtonCreate />
      </Link>
    </section>
  );
}

export default Psychologists;
