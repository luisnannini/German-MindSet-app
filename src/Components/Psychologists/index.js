import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import PsyList from './PsychologistList';
import Button from './Button';
const field = 'Psychologists';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        savePsychologists(response.data);
      });
  }, []);

  const showForm = () => {
    window.location.href = `psychologists/form`;
  };

  return (
    <section className={styles.container}>
      <div>
        <h2>{field}</h2>
      </div>
      <div>
        <ul className={styles.listElem}>
          <li>First Name</li>
          <li>Last Name</li>
          <li>Username</li>
          <li>Email</li>
          <li>Phone Number</li>
          <li>Address</li>
          <li>EDIT</li>
          <li>DELETE</li>
        </ul>
      </div>
      <div>
        {psychologists.map((psy) => {
          return <PsyList name={psy} key={psy._id} />;
        })}
      </div>
      <Button action={showForm} name={'ADD'} />
    </section>
  );
}

export default Psychologists;
