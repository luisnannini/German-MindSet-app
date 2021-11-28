import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import List from './List';
import AddButton from './AddButton';
import Form from './Form';

function Clients() {
  const [clients, setClients] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
  }, []);

  const removeClient = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/positions/${id}`, {
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
        <AddButton onClick={() => setOpenForm(!openForm)} />
        {openForm ? <Form openForm={openForm} setOpenForm={setOpenForm} /> : null}
      </div>
    </section>
  );
}

export default Clients;
