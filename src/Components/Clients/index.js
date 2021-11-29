import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import List from './List';
import AddButton from './AddButton';
import Form from './Form';
import Modal from './Modal';

function Clients() {
  const [clients, setClients] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
  }, []);

  const showForm = (client) => {
    if (client) {
      window.location.href = `clients/form?id=${client._id}`;
    } else {
      window.location.href = `clients/form`;
    }
  };

  const removeClient = (id) => {
    fetch(`${process.env.REACT_APP_API}/clients/${id}`, {
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
      .catch((error) => error);
  };

  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <List
        name={'Name'}
        phone={'Cellphone'}
        country={'Country'}
        state={'State'}
        city={'City'}
        address={'Address'}
        logo={'Logo'}
        description={'Description'}
        edit={''}
        remove={''}
      />
      <div>
        {clients.map((client) => {
          return (
            <List
              key={client._id}
              name={client.name}
              phone={client.phone}
              country={client.location.country}
              state={client.location.state}
              city={client.location.city}
              address={client.location.address}
              logo={client.logo}
              description={client.description}
              edit={''}
              onRemove={() => removeClient(client._id)}
            />
          );
        })}
      </div>
      <div className={styles.add}>
        <AddButton onClick={() => showForm()} />
      </div>
    </section>
  );
}

export default Clients;
