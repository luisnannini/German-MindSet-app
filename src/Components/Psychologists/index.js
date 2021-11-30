import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import PsyList from './PsychologistList';
import Button from './Button';
import Modal from './PsychologistList/PsychologistOptions/Modal';
const field = 'Psychologists';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);

  const [modal, changeModal] = useState(false);

  const modalOpen = () => {
    changeModal(!modal);
  };

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
          console.log(JSON.stringify(psy));
          return <PsyList name={psy} key={psy._id} />;
        })}
      </div>
      <Button action={modalOpen} name={'ADD'} />
      <Modal visible={modal} condition={'add'} />
    </section>
  );
}

export default Psychologists;
