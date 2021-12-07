import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './interviews.module.css';
import CreateButton from './CreateButton';
import EditButton from './EditButton';
import RemoveModal from './RemoveModal';
import ModalError from '../Shared/Modal-Error/modal-error';

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
      .then(() => {})
      .catch((error) => {
        setShowRemoveModal(false);
        setError({ show: true, message: error.message, title: error.status });
      });
  };

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <h1>Interviews</h1>
      <ul className={styles.list1}>
        <li>Postulant</li>
        <li>Client</li>
      </ul>
      <ul className={styles.list2}>
        <li>First Name</li>
        <li>Last Name</li>
        <li>Name</li>
        <li>ID</li>
        <li>Status</li>
        <li>Date</li>
        <li>Notes</li>
        <li>Actions</li>
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
            <li className={styles.buttons}>
              <Link to={`interviews/form?id=${interview._id}`}>
                <EditButton />
              </Link>
            </li>
            <li className={styles.buttons}>
              <button
                onClick={(event) => {
                  handleDelete(event, interview);
                  setShowRemoveModal(true);
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        );
      })}
      <RemoveModal
        show={showRemoveModal}
        confirmRemoveModal={confirmRemoveModal}
        closeRemoveModal={closeRemoveModal}
      />
      <Link to="interviews/form">
        <CreateButton />
      </Link>
    </div>
  );
}

export default Interviews;
