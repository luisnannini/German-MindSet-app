import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './clients.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

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
    setShowDelete(true);
  };

  const deleteClient = () => {
    setShowDelete(false);
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
            setSelectedClient(undefined);
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client?"
        onCancel={() => setShowDelete(false)}
        onConfirm={deleteClient}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Clients</h2>
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
                  <Link to={`clients/form?id=${client._id}`}>
                    <ButtonUpdate disabled={isLoading} />
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
    </section>
  );
}

export default Clients;
