import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './positions.module.css';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonDelete from '../Shared/ButtonDelete';
import ButtonUpdate from '../Shared/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
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
        setPositions(response.data);
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, position) => {
    event.stopPropagation();
    setSelectedPosition(position._id);
    setShowModal(true);
  };

  const deletePosition = () => {
    setShowModal(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions/${selectedPosition}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/positions`)
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
            setPositions(response.data);
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
        show={showModal}
        title="Delete a Position"
        message="Are you sure you want to delete this position?"
        onCancel={() => setShowModal(false)}
        onConfirm={deletePosition}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Positions</h2>
          <Link to="./positions/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Profiles</th>
              <th>Job Description</th>
              <th>Vacancy</th>
              <th>Is Open</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return (
                <tr key={position._id}>
                  <td>{position.client.name}</td>
                  <td>{position.professionalProfiles.name}</td>
                  <td>{position.jobDescription}</td>
                  <td>{position.vacancy}</td>
                  <td>{position.isOpen ? 'Yes' : 'No'}</td>
                  <td>
                    <Link to={`positions/form?id=${position._id}`}>
                      <ButtonUpdate disabled={isLoading} />
                    </Link>
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, position)}
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

export default Positions;
