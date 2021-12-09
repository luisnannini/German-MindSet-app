import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins`)
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
        setAdmins(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
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
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/admins`)
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
            setAdmins(response.data);
            setShowModal(false);
          });
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showModal}
        title="Delete Admin"
        message="Are you sure you want to delete this Admin?"
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
              <Link
                to={{
                  pathname: '/admins/form',
                  search: `id=${admin._id}`,
                  state: { admin }
                }}
              >
                <ButtonUpdate />
              </Link>
            </li>
            <li>
              <ButtonDelete onClick={(event) => handleDelete(event, admin)} />
            </li>
          </ul>
        ))}
      </div>
      {isLoading && <div className={styles.loader}></div>}
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
    </section>
  );
}

export default Admins;
