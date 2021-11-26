import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import PsyList from './PsychologistList';
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

  return (
    <section className={styles.container}>
      <div>
        <h2>{field}</h2>
      </div>
      <div>
        {psychologists.map((psy) => {
          console.log(psy);
          return <PsyList name={psy} key={psy._id} />;
        })}
      </div>
    </section>
  );
}

export default Psychologists;
