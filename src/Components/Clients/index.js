import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import List from './List';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';
import AddButton from './AddButton';
import Form from './Form';

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
  }, []);

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
              edit={<EditButton />}
              remove={<RemoveButton />}
            />
          );
        })}
      </div>
      <div className={styles.add}>
        <AddButton onClick />
      </div>
    </section>
  );
}

export default Clients;
