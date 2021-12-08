import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './psychologists.module.css';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => savePsychologists(response.data))
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, psy) => {
    event.stopPropagation();
    setShowModalDelete(true);
    setSelectedPsychologist(psy._id);
  };

  const deletePsychologist = () => {
    setShowModalDelete(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists/${selectedPsychologist}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/psychologists`)
          .then((response) => {
            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
              const status = `${response.status} ${response.statusText}`;
              return response.json().then(({ message }) => {
                if (message.message) throw { message: message.message, status };
                throw { message, status };
              });
            }
            return response.json();
          })
          .then((response) => {
            savePsychologists(response.data);
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showModalDelete}
        title="Delete Psychologist"
        message="Are you sure you want to delete this Psychologist?"
        onConfirm={deletePsychologist}
        onCancel={() => setShowModalDelete(false)}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Psychologist</h2>
          <Link to="./psychologists/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <div>
          <ul className={styles.listHeader}>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Username</li>
            <li>Email</li>
            <li>Phone Number</li>
            <li>Address</li>
            <li>Actions</li>
            <li></li>
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
                    <ButtonUpdate disabled={isLoading} />
                  </Link>
                </li>
                <li>
                  <ButtonDelete
                    disabled={isLoading}
                    onClick={(event) => handleDelete(event, psychologist)}
                  />
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      {isLoading && <div className={styles.loader}></div>}
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </section>
  );
}

export default Psychologists;
