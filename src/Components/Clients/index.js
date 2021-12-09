import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';
import styles from './clients.module.css';
import ModalError from '../Shared/ModalError';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
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
      .then((response) => setClients(response.data))
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, client) => {
    event.stopPropagation();
    setSelectedClient(client._id);
    setShowModal(true);
  };

  const deleteClient = () => {
    setShowModal(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients/${selectedClient}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/clients`)
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
            setClients(response.data);
            closeModal();
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
        setShowModal(false);
      })
      .finally(() => setLoading(false));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(undefined);
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showModal}
        title="Delete Client"
        message="Are you sure you want to delete this client?"
        onCancel={closeModal}
        onConfirm={deleteClient}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Clients List</h2>
          <Link to="./clients/form">
            <ButtonCreate disable={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
              <th>Logo</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.location.country}</td>
                <td>{client.location.state}</td>
                <td>{client.location.city}</td>
                <td>{client.location.address}</td>
                <td>{client.logo}</td>
                <td>{client.description}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/clients/form',
                      search: `id=${client._id}`,
                      state: { client }
                    }}
                  >
                    <ButtonUpdate />
                  </Link>
                  <ButtonDelete
                    disabled={isLoading}
                    onClick={(event) => handleDelete(event, client)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
      <ModalError error={error} onConfirm={() => setError({ show: false })} />{' '}
    </section>
  );
}

export default Clients;
