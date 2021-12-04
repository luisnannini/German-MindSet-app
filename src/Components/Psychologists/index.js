import { useEffect, useState } from 'react';
import styles from './psychologists.module.css';
import Button from './Button';
import ModalDelete from './ModalDelete';

const field = 'Psychologists';

function Psychologists() {
  const [psychologists, savePsychologists] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  // const [psychologist, setPsychologist] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        savePsychologists(response.data);
      });
  }, []);

  const showForm = (psy) => {
    if (psy) {
      window.location.href = `psychologists/form?id=${psy._id}`;
    } else {
      window.location.href = `psychologists/form`;
    }
  };

  const handleDelete = (event, psy) => {
    event.stopPropagation();
    setShowModalDelete(true);
    setSelectedPsychologist(psy._id);
  };

  const deletePsychologist = () => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${selectedPsychologist}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/psychologists`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then(async (response) => {
            await savePsychologists(response.data);
            await setShowModalDelete(false);
          });
      })
      .catch((error) => error);
  };

  const closeModal = () => {
    setShowModalDelete(false);
  };

  return (
    <section className={styles.container}>
      <ModalDelete visible={showModalDelete} action={deletePsychologist} close={closeModal} />
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
          return (
            <ul key={psy._id} className={styles.listElem}>
              <li>{psy.firstName}</li>
              <li>{psy.lastName}</li>
              <li>{psy.username}</li>
              <li>{psy.email}</li>
              <li>{psy.phone}</li>
              <li>{psy.address}</li>
              <li>
                <button onClick={() => showForm(psy)}>Update</button>
              </li>
              <li>
                <button onClick={(event) => handleDelete(event, psy)}>Delete</button>
              </li>
            </ul>
          );
        })}
      </div>
      <Button action={() => showForm()} name={'ADD'} />
    </section>
  );
}

export default Psychologists;
