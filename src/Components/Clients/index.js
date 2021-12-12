import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './clients.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, deleteClient } from '../../redux/Clients/thunks';
import { closeErrorModal } from '../../redux/Clients/actions';

function Clients() {
  const [selectedClient, setSelectedClient] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const clients = useSelector((store) => store.clients.list);
  const error = useSelector((store) => store.clients.error);
  const isLoading = useSelector((store) => store.clients.isLoading);

  useEffect(() => {
    if (!clients.length) {
      dispatch(getClients());
    }
  }, [clients]);

  const handleDelete = (event, client) => {
    event.stopPropagation();
    setSelectedClient(client._id);
    setShowDelete(true);
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete a Client"
        message="Are you sure you want to delete this Client?"
        onConfirm={() => {
          dispatch(deleteClient(selectedClient)).then(() => {
            setSelectedClient(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Clients</h2>
          <ButtonCreate disabled={isLoading} onClick={() => history.push('/clients/form')} />
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
                  <ButtonUpdate
                    disabled={isLoading}
                    onClick={() => history.push(`/Clients/form?_id=${client._id}`)}
                  />
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
