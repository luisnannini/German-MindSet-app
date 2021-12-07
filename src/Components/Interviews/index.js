import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './interviews.module.css';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(undefined);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
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
        setInterviews(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
  }, []);

  const handleDelete = (event, interview) => {
    event.stopPropagation();
    setSelectedInterview(interview._id);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
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
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
      })
      .then(() => {
        setShowRemoveModal(false);
      })
      .catch((error) => {
        setShowRemoveModal(false);
        setError({ show: true, message: error.message, title: error.status });
      });
  };

  return (
    <section>
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
        <Modal
          show={showRemoveModal}
          title="Delete Interview"
          message="Are you sure you want to delete this interview?"
          onConfirm={confirmRemoveModal}
          onCancel={closeRemoveModal}
        />
      </div>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </section>
  );
}

export default Interviews;
