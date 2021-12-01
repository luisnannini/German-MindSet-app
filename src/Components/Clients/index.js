import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './clients.module.css';
import AddButton from './AddButton';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';

function Clients() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => setClients(response.data))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, client) => {
    event.stopPropagation();
    setSelectedClient(client._id);
    setShowModal(true);
  };

  const showForm = (client) => {
    if (client) {
      window.location.href = `clients/form?id=${client._id}`;
    } else {
      window.location.href = `clients/form`;
    }
  };

  const deleteClient = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients/${selectedClient}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/clients`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setClients(response.data);
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
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
                <EditButton onClick={() => showForm(client)} />
                <RemoveButton onClick={(event) => handleDelete(event, client)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.error}>{error}</div>
      <AddButton disabled={isLoading} onClick={() => showForm()} />
    </section>
  );
}

export default Clients;
