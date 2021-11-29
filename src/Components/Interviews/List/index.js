import React, { useState, useEffect } from 'react';
import styles from './list.module.css';
import EditButton from '../EditButton';
import EditForm from '../EditForm';
import RemoveButton from '../RemoveButton';
import RemoveModal from '../RemoveModal';

const List = (props) => {
  const [interviews, setInterviews] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
  }, []);

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
  };

  const confirmRemoveModal = (id) => {
    const url = `${process.env.REACT_APP_API}/interviews/${id}`;

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
      .catch((error) => error);
  };

  return (
    <div>
      <EditForm show={showEditForm} closeEditForm={closeEditForm} />
      <RemoveModal
        show={showRemoveModal}
        closeRemoveModal={closeRemoveModal}
        confirmRemoveModal={confirmRemoveModal}
      />
      <ul className={styles.list}>
        <li>{props.postulant.firstName}</li>
        <li>{props.postulant.lastName}</li>
        <li>{props.client.name}</li>
        <li>{props.application.result}</li>
        <li>{props.status}</li>
        <li>{props.date}</li>
        <li>{props.notes}</li>
        <li className={styles.buttons}>
          <EditButton onClick={() => setShowEditForm(true)} />
        </li>
        <li className={styles.buttons}>
          <RemoveButton onClick={() => setShowRemoveModal(true)} />
        </li>
      </ul>
    </div>
  );
};

export default List;
