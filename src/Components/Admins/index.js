import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import Modal from './Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => setError(error.toString()));
  }, []);

  const handleDelete = (event, admin) => {
    event.stopPropagation();
    setSelectedAdmin(admin._id);
    setShowModal(true);
  };

  const deleteAdmin = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins/${selectedAdmin}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/admins`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setAdmins(response.data);
            setShowModal(false);
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <Modal
        show={showModal}
        isLoading={isLoading}
        onCancel={() => setShowModal(false)}
        onConfirm={deleteAdmin}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Administrators</h2>
          <Link to="/admins/form">
            <ButtonCreate />
          </Link>
        </div>
        <ul className={styles.listHeader}>
          <li>Name</li>
          <li>Username</li>
          <li>Actions</li>
          <li></li>
        </ul>
        {admins.map((admin) => (
          <ul key={admin._id} className={styles.list}>
            <li>{admin.name}</li>
            <li>{admin.username}</li>
            <li>
              <Link to={`admins/form?id=${admin._id}`}>
                <ButtonUpdate />
              </Link>
            </li>
            <li>
              <ButtonDelete onClick={(event) => handleDelete(event, admin)} />
            </li>
          </ul>
        ))}
      </div>
      <div className={styles.error}>{error}</div>
    </section>
  );
}

export default Admins;
