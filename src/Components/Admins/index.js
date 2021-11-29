import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Button from './Button';
import Modal from './Modal';

function Admins() {
  const [modal, changeModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => setAdmins(response.data))
      .catch((error) => error.toString());
  }, []);

  const openModal = () => {
    changeModal(!modal);
  };

  const handleDelete = (event, admin) => {
    event.stopPropagation();
    setSelectedAdmin(admin._id);
    openModal();
  };

  const deleteAdmin = () => {
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
            openModal();
          });
      })
      .catch((error) => error.toString());
  };

  return (
    <section className={styles.container}>
      <Modal visible={modal} cancel={openModal} confirm={deleteAdmin} />
      <h2>administrators</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>
                <Button name={'edit'} />
              </td>
              <td>
                <Button name={'delete'} action={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add</button>
    </section>
  );
}

export default Admins;
