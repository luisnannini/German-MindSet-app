import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './positions.module.css';
import Modal from './Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
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
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/positions`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setShowModal(false);
            setPositions(response.data);
            setShowSuccessModal(true);
            setSuccess('You request was successful!');
          });
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  return (
    <section>
      <Modal
        show={showModal}
        title="Delete a Position"
        message="Are you sure you want to delete this position?"
        onCancel={closeModal}
        onConfirm={deletePosition}
      />
      <Modal
        show={showSuccessModal}
        title="Successful"
        message={success}
        onCancel={closeModal}
        hideButton={true}
      />
      <Modal
        show={showErrorModal}
        title="Error"
        message={error}
        onCancel={closeModal}
        hideButton={true}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Positions</h2>
          <Link to="./positions/form">
            <ButtonCreate />
          </Link>
        </div>
        <ul className={styles.listHeader}>
          <li>Client</li>
          <li>Profiles</li>
          <li>Job Description</li>
          <li>Vacancy</li>
          <li>Is Open</li>
          <li>Actions</li>
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
    </section>
  );
}

export default Positions;
