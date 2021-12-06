import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Table from './Table';
import Modal from './Modal';
import ButtonCreate from '../Shared/ButtonCreate';

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
    setShowModal(true);
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
        onClose={() => {
          setShowModal(false);
          setShowForm(false);
          setShowUpdate(false);
          setShowRemove(false);
        }}
        show={showModal}
        showForm={showForm}
        showUpdate={showUpdate}
        updateId={updateId}
        showRemove={showRemove}
        removeConfirm={() => remove(removeId)}
      />
    </section>
  );
}

export default Applications;
