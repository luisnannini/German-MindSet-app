import styles from './postulants.module.css';
import { useEffect, useState } from 'react';
import Items from './Items.js';
import Button from './Button';
import Modal from './Modal';
import FormUpdate from './Form-Update.js';

function Postulants() {
  const [listPostulants, setListPostulants] = useState([]);
  const [formPostulants, setFormPostulants] = useState([]);
  const [modal, setModal] = useState({ state: false });
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');

  const url = `${process.env.REACT_APP_API}/postulants`;

  const getPostulants = async () => {
    const responseRaw = await fetch(url);
    const responseJson = await responseRaw.json();
    return responseJson.data;
  };

  const usePostulants = async () => {
    const postulants = await getPostulants();
    setFormPostulants(postulants);
    const listData = postulants.map((postulant) => {
      // postulant es un array de objetos
      return (postulant = {
        _id: postulant._id,
        firstName: postulant.firstName,
        lastName: postulant.lastName,
        email: postulant.email,
        phone: postulant.phone,
        available: postulant.available
      });
    });
    setListPostulants(listData);
  };

  useEffect(() => {
    usePostulants();
  }, []);

  const confirmDelete = async (id) => {
    const responseRaw = await fetch(`${url}?id=${id}`, {
      method: 'DELETE'
    });
    setModal({ title: 'Deleted', state: true, message: 'Update successfull' });
  };

  if (id && formPostulants[0]) {
    return (
      <FormUpdate postulant={formPostulants.find((postulant) => postulant._id === id)} id={id} />
    );
  }
  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <Items
        postulants={listPostulants}
        setModal={setModal}
        onDelete={confirmDelete} // lo que va a hacer el boton "ok" del modal
      />
      <div>
        <Button
          title="Add"
          onClick={() => (window.location.href = `${window.location.origin}/postulants-form`)}
          setModal={setModal}
        />
      </div>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Postulants;
