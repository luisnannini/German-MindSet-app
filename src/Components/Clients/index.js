import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import styles from './clients.module.css';
import AddButton from './AddButton';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';
import ModalError from '../Shared/Modal-Error/modal-error';

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
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients/${selectedClient}asd`, { method: 'DELETE' })
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
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this client?"
        onCancel={closeModal}
        isLoading={isLoading}
        onConfirm={deleteClient}
      />
      <h2>Clients List</h2>
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
                <Link to={`clients/form?id=${client._id}`}>
                  <EditButton />
                </Link>
                <RemoveButton onClick={(event) => handleDelete(event, client)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />{' '}
      <Link to="./clients/form">
        <AddButton />
      </Link>
    </section>
  );
}

export default Clients;
