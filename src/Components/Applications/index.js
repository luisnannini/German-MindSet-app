import { useEffect, useState } from 'react';
import styles from './applications.css';
import Table from './Table/Table.js';
import Modal from './Modal/Modal.js';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [removeId, setRemoveId] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      });
  }, []);

  const removeReq = (id) => {
    setRemoveId(id);
    setShowForm(false);
    setShowEdit(false);
    setShowModal(true);
    setShowRemove(true);
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
      <h2>Applications</h2>
      <button
        className="add-button"
        onClick={() => {
          setShowModal(true);
          setShowForm(true);
          setShowEdit(false);
          setShowRemove(false);
        }}
      >
        Add Application
      </button>
      <Table
        applications={applications}
        onClickEdit={() => {
          setShowModal(true);
          setShowEdit(true);
          setShowForm(false);
          setShowRemove(false);
        }}
        removeReq={removeReq}
        //editReq={editReq}
      />
      <Modal
        onClose={() => {
          setShowModal(false);
          setShowForm(false);
          setShowEdit(false);
          setShowRemove(false);
        }}
        show={showModal}
        showForm={showForm}
        showEdit={showEdit}
        showRemove={showRemove}
        removeConfirm={() => remove(removeId)}
      />
    </section>
  );
}

export default Applications;
