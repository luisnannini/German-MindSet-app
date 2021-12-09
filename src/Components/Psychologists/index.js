import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './psychologists.module.css';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonDelete from '../Shared/ButtonDelete';
import ButtonUpdate from '../Shared/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
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
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Psychologist</h2>
          <Link to="./psychologists/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.map((psychologist) => {
              return (
                <tr key={psychologist._id} className={styles.list}>
                  <td>{psychologist.firstName}</td>
                  <td>{psychologist.lastName}</td>
                  <td>{psychologist.username}</td>
                  <td>{psychologist.email}</td>
                  <td>{psychologist.phone}</td>
                  <td>{psychologist.address}</td>
                  <td>
                    <Link to={`psychologists/form?id=${psychologist._id}`}>
                      <ButtonUpdate disabled={isLoading} />
                    </Link>
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, psychologist)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Psychologists;
