import { useState, useEffect } from 'react';
import styles from './positions.module.css';
import CreateButton from './CreateButton';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import Modal from './Modal';

function Positions() {
  const [positions, setPositions] = useState([]);
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

  const showForm = (position) => {
    if (position) {
      window.location.href = `positions/form?id=${position._id}`;
    } else {
      window.location.href = `positions/form`;
    }
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
            <ul key={position._id}>
              <li>{position.client.name}</li>
              <li>{position.professionalProfiles}</li>
              <li>{position.jobDescription}</li>
              <li>{position.vacancy}</li>
              <li>{position.isOpen ? 'Yes' : 'No'}</li>
              <li>
                <UpdateButton onClick={() => showForm(position)} />
              </li>
              <li>
                <DeleteButton onClick={(event) => handleDelete(event, position)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.button}>
        <CreateButton onClick={() => showForm()} />
      </div>
    </section>
  );
}

export default Positions;
