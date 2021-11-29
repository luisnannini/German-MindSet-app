import React, { useState } from 'react';
import styles from './list.module.css';
import EditButton from '../EditButton';
import EditForm from '../EditForm';
import RemoveButton from '../RemoveButton';
import RemoveModal from '../RemoveModal';

const List = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const confirmEditForm = () => {
    console.log('confirm edit');
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
  };

  const confirmRemoveModal = () => {
    console.log('confirm remove');
  };

  return (
    <div>
      <EditForm
        show={showEditForm}
        closeEditForm={closeEditForm}
        confirmEditForm={confirmEditForm}
      />
      <RemoveModal
        show={showRemoveModal}
        closeRemoveModal={closeRemoveModal}
        confirmRemoveModal={confirmRemoveModal}
      />
      <ul className={styles.list}>
        <li>{props.postulant.firstName}</li>
        <li>{props.postulant.lastName}</li>
        <li>{props.client.name}</li>
        <li>{props.application._id}</li>
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
