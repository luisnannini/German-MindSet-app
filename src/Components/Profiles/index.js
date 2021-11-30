import { useState, useEffect } from 'react';
import styles from './profiles.module.css';
import Modal from './Modal';
import CreateButton from './CreateButton';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  }, []);

  const handleDelete = (event, profile) => {
    event.stopPropagation();
    setSelectedProfile(profile._id);
    setShowModal(true);
  };

  const deleteProfile = () => {
    fetch(`${process.env.REACT_APP_API}/profiles/${selectedProfile}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/profiles`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setProfiles(response.data);
            closeModal();
          });
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  };

  const showForm = (profile) => {
    if (profile) {
      window.location.href = `profiles/form?id=${profile._id}`;
    } else {
      window.location.href = `profiles/form`;
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowErrorModal(false);
  };

  return (
    <section>
      <Modal
        show={showModal}
        title="Delete a Profile"
        message="Are you sure you want to delete this profile?"
        onCancel={closeModal}
        onConfirm={deleteProfile}
      />
      <Modal show={showErrorModal} title="Error" message={error} onCancel={closeModal} />
      <div className={styles.container}>
        <h2 className={styles.title}>Profiles</h2>
        <ul className={styles.listHeader}>
          <li>Profiles</li>
          <li></li>
          <li></li>
        </ul>
        {profiles.map((profile) => {
          return (
            <ul key={profile._id} className={styles.list}>
              <li>{profile.name}</li>
              <li>
                <UpdateButton onClick={() => showForm(profile)} />
              </li>
              <li>
                <DeleteButton onClick={(event) => handleDelete(event, profile)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.button}>
        <CreateButton onClick={() => showForm()} />
      </div>
    </section>
  );
}

export default Profiles;
