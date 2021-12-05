import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Table from './Table';
import ModalForm from './ModalForm';
import Modal from '../Shared/Modal';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [showRemove, setShowRemove] = useState(false);
  const [removeId, setRemoveId] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => error);
  }, []);

  const removeReq = (id) => {
    setRemoveId(id);
    setShowForm(false);
    setShowUpdate(false);
    setShowRemove(true);
  };
  const updateReq = (id) => {
    setUpdateId(id);
    setShowModal(true);
    setShowUpdate(true);
    setShowForm(false);
    setShowRemove(false);
  };
  const remove = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json(`Id: ${id}`);
      })
      .then(() => {
        window.location.href = `${window.location.origin}/applications`;
      })
      .catch((error) => error);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Applications</h2>
        <button
          className={styles.button}
          onClick={() => {
            setShowModal(true);
            setShowForm(true);
            setShowUpdate(false);
            setShowRemove(false);
          }}
        >
          Add Application
        </button>
      </div>
      <Table applications={applications} updateReq={updateReq} removeReq={removeReq} />
      <Modal
        show={showRemove}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        onCancel={() => {
          setShowRemove(false);
        }}
        onConfirm={() => {
          remove(removeId);
          setShowRemove(false);
        }}
      />
      <ModalForm
        onClose={() => {
          setShowModal(false);
          setShowForm(false);
          setShowUpdate(false);
        }}
        show={showModal}
        showForm={showForm}
        showUpdate={showUpdate}
        updateId={updateId}
      />
    </section>
  );
}

export default Applications;
