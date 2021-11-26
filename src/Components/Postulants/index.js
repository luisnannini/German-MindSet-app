import styles from './postulants.module.css';
import { useEffect, useState } from 'react';
import Items from './Items.js';

function Postulants() {
  const [postulants, setPostulants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <Items postulants={postulants} key={Math.floor(Math.random() * 10000)} />
    </section>
  );
}

export default Postulants;
