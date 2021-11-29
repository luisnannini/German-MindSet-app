import styles from './postulants.module.css';
import { useEffect, useState } from 'react';
import Items from './Items.js';
import Button from './Button';
import Modal from './Modal';
import FormAdd from './Form-Add.js';
import FormUpdate from './Form-Update.js';

function Postulants() {
  const [listPostulants, setListPostulants] = useState([]);
  const [formPostulants, setFormPostulants] = useState([]);
  const [formState, setFormState] = useState(false);
  const [modal, setModal] = useState({ state: false });
  const params = new URLSearchParams(window.location.search);
  let id = params.get('id');

  const postulantTemplate = {
    contactRange: {
      from: '',
      to: ''
    },
    studies: {
      primaryStudies: {
        startDate: '',
        endDate: '',
        school: ''
      },
      secondaryStudies: {
        startDate: '',
        endDate: '',
        school: ''
      },
      tertiaryStudies: [
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ],
      universityStudies: [
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ],
      informalStudies: [
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ]
    },
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    birthday: '',
    available: '',
    phone: '',
    profiles: [
      {
        profileId: {
          _id: '',
          name: ''
        }
      }
    ],
    workExperience: [
      {
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      },
      {
        company: '',
        startDate: '',
        endDate: '',
        description: undefined
      }
    ],
    createdAt: '',
    updatedAt: ''
  };

  const getPostulants = async () => {
    const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants`);
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
    /* const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants/${id}`, {
      method: 'DELETE'
    });
    const responseJson = await responseRaw.json(); */
    setModal({ title: 'Deleted', state: true, message: 'Deletion successfully' });
  };

  if (id) {
    return (
      <FormUpdate
        postulant={formPostulants.find((postulant) => postulant._id === id)}
        id={id}
        postulantTemplate={postulantTemplate}
      />
    );
  }
  if (formState) {
    return <FormAdd />;
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
