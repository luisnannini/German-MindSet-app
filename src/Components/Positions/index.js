import { useState, useEffect } from 'react';
import styles from './positions.module.css';
import CreateButton from './CreateButton';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import Form from './Form';
import HeaderList from './HeaderList';
import Modal from './Modal';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response.data);
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
            setPositions(response.data);
            closeModal();
          });
      })
      .catch((error) => error);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <Modal
        show={showModal}
        title="Delete a Position"
        message="Are you sure you want to delete this session?"
        onCancel={closeModal}
        onConfirm={deletePosition}
      />
      <Form show={showForm} onCancel={closeForm} />
      <div className={styles.container}>
        <h2>Positions</h2>
        <ul className={styles.list}>
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
            <ul className={styles.list} key={position._id}>
              <li>{position.client.name}</li>
              <li>{position.professionalProfiles}</li>
              <li>{position.jobDescription}</li>
              <li>{position.vacancy}</li>
              <li>{position.isOpen ? 'Yes' : 'No'}</li>
              <li>
                <UpdateButton />
              </li>
              <li>
                <DeleteButton onClick={(event) => handleDelete(event, position)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.button}>
        <CreateButton onClick={() => setShowForm(true)} />
      </div>
    </section>
  );
}

export default Positions;
