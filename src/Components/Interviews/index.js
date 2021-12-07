import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './interviews.module.css';
import RemoveModal from './RemoveModal';
import Modal from './Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(undefined);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((error) => error);
  }, []);

  const handleDelete = (event, interview) => {
    event.stopPropagation();
    setSelectedInterview(interview._id);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
  };

  const closeModalSuccess = () => {
    setShowSuccessDelete(false);
    window.location.href = '/interviews';
  };

  const confirmRemoveModal = () => {
    const url = `${process.env.REACT_APP_API}/interviews/${selectedInterview}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
      })
      .then(() => {
        setShowRemoveModal(false);
        setShowSuccessDelete(true);
      })
      .catch((error) => error);
  };

  return (
    <section>
      <Modal
        show={showSuccessDelete}
        title="Successful"
        message={'Interview deleted'}
        onCancel={closeModalSuccess}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Interviews</h2>
          <Link to="interviews/form">
            <ButtonCreate />
          </Link>
        </div>
        <ul className={styles.listHeader}>
          <li>Postulant</li>
          <li></li>
          <li>Client</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className={styles.listHeader}>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Name</li>
          <li>ID</li>
          <li>Status</li>
          <li>Date</li>
          <li>Notes</li>
          <li>Actions</li>
          <li></li>
        </ul>
        {interviews.map((interview) => {
          return (
            <ul className={styles.list} key={interview._id}>
              <li>{interview.postulant.firstName}</li>
              <li>{interview.postulant.lastName}</li>
              <li>{interview.client.name}</li>
              <li>{interview.application.result}</li>
              <li>{interview.status}</li>
              <li>{interview.date.replace('T00:00:00.000Z', '')}</li>
              <li>{interview.notes}</li>
              <li>
                <Link to={`interviews/form?id=${interview._id}`}>
                  <ButtonUpdate />
                </Link>
              </li>
              <li>
                <ButtonDelete
                  onClick={(event) => {
                    handleDelete(event, interview);
                    setShowRemoveModal(true);
                  }}
                />
              </li>
            </ul>
          );
        })}
        <RemoveModal
          show={showRemoveModal}
          confirmRemoveModal={confirmRemoveModal}
          closeRemoveModal={closeRemoveModal}
        />
      </div>
    </section>
  );
}

export default Interviews;
