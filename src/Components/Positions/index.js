import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './positions.module.css';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(undefined);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
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
      });
  }, []);

  const handleDelete = (event, position) => {
    event.stopPropagation();
    setSelectedPosition(position._id);
    setShowModal(true);
  };

  const deletePosition = () => {
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
            setShowModal(false);
            setPositions(response.data);
          });
      })
      .catch((error) => {
        setShowModal(false);
        setError({ show: true, message: error.message, title: error.status });
      });
  };

  return (
    <section>
      <Modal
        show={showModal}
        title="Delete a Position"
        message="Are you sure you want to delete this position?"
        onCancel={() => setShowModal(false)}
        onConfirm={deletePosition}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <h2 className={styles.title}>Positions</h2>
        <ul className={styles.listHeader}>
          <li>Client</li>
          <li>Profiles</li>
          <li>Job Description</li>
          <li>Vacancy</li>
          <li>Is Open</li>
          <li></li>
          <li></li>
        </ul>
        {positions.map((position) => {
          return (
            <ul key={position._id} className={styles.list}>
              <li>{position.client.name}</li>
              <li>{position.professionalProfiles.name}</li>
              <li>{position.jobDescription}</li>
              <li>{position.vacancy}</li>
              <li>{position.isOpen ? 'Yes' : 'No'}</li>
              <li>
                <Link to={`positions/form?id=${position._id}`}>
                  <ButtonUpdate />
                </Link>
              </li>
              <li>
                <ButtonDelete onClick={(event) => handleDelete(event, position)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.button}>
        <Link to="/positions/form">
          <ButtonCreate />
        </Link>
      </div>
    </section>
  );
}

export default Positions;
