import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Table from './Table';
import ModalError from '../Shared/ModalError';
import ModalForm from './ModalForm';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [showRemove, setShowRemove] = useState(false);
  const [removeId, setRemoveId] = useState('');
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
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
        setApplications(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
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
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json(`Id: ${id}`);
      })
      .then(() => {
        window.location.href = `${window.location.origin}/applications`;
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
  };

  return (
    <section className={styles.container}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.header}>
        <h2 className={styles.title}>Applications</h2>
        <ButtonCreate
          onClick={() => {
            setShowModal(true);
            setShowForm(true);
            setShowUpdate(false);
            setShowRemove(false);
          }}
        />
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
