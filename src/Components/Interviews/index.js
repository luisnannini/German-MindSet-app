import React, { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import CreateButton from './CreateButton';
import CreateForm from './CreateForm';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';
import RemoveModal from './RemoveModal';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
  }, []);

  const handleDelete = (event, interview) => {
    event.stopPropagation();
    setSelectedInterview(interview._id);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const showForm = (interview) => {
    if (interview) {
      window.location.href = `interviews/form?id=${interview._id}`;
    } else {
      window.location.href = `interviews/`;
    }
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    showRemoveModal(false);
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
        window.location.href = '/interview';
      })
      .catch((error) => error);
  };

  return (
    <div className={styles.container}>
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
            <li>{interview.date}</li>
            <li>{interview.notes}</li>
            <li className={styles.buttons}>
              <EditButton onClick={() => showForm(interview)} />
            </li>
            <li className={styles.buttons}>
              <RemoveButton
                onClick={(event) => {
                  handleDelete(event, interview);
                  setShowRemoveModal(true);
                }}
              />
            </li>
            <RemoveModal
              show={showRemoveModal}
              confirmRemoveModal={confirmRemoveModal}
              closeRemoveModal={closeRemoveModal}
            />
          </ul>
        );
      })}

      <CreateForm show={showCreateForm} closeCreateForm={closeCreateForm} />
      <div>
        <CreateButton onClick={() => setShowCreateForm(true)} />
      </div>
    </div>
  );
}

export default Interviews;
