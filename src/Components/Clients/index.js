import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import List from './List';

function Clients() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <section className={styles.container}>
      <h2>Clients</h2>
      <List
        id={'ID'}
        name={'Name'}
        phone={'Cellphone'}
        country={'Country'}
        state={'State'}
        city={'City'}
        address={'Address'}
        logo={'Logo'}
        description={'Description'}
        timestamps={'Timestamps'}
      />
      <div>
        {clients.map((client) => {
          return (
            <List
              key={client._id}
              id={client._id}
              name={client.name}
              phone={client.phone}
              country={client.location.country}
              state={client.location.state}
              city={client.location.city}
              address={client.location.address}
              logo={client.logo}
              description={client.description}
              timestamps={client.timestamps}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Clients;
