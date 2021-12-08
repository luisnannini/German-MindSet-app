import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './profiles.module.css';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, profile) => {
    event.stopPropagation();
    setSelectedProfile(profile._id);
    setShowModal(true);
  };

  const deleteProfile = () => {
    setShowModal(false);
    fetch(`${process.env.REACT_APP_API}/profiles/${selectedProfile}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/profiles`)
          .then((response) => {
            if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
              const status = `${response.status} ${response.statusText}`;
              return response.json().then(({ message }) => {
                if (message.message) throw { message: message.message, status };
                throw { message, status };
              });
            }
            return response.json();
          })
          .then((response) => {
            setProfiles(response.data);
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });
  };

  return (
    <section>
      <Modal
        show={showModal}
        title="Delete a Profile"
        message="Are you sure you want to delete this profile?"
        onConfirm={deleteProfile}
        onCancel={() => setShowModal(false)}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Profiles</h2>
          <Link to="./profiles/form">
            <ButtonCreate d />
          </Link>
        </div>
        <ul className={styles.listHeader}>
          <li>Profiles</li>
          <li>Actions</li>
          <li></li>
        </ul>
        {profiles.map((profile) => {
          return (
            <ul key={profile._id} className={styles.list}>
              <li>{profile.name}</li>
              <li>
                <Link to={`profiles/form?id=${profile._id}`}>
                  <ButtonUpdate disabled={isLoading} />
                </Link>
              </li>
              <li>
                <ButtonDelete
                  disabled={isLoading}
                  onClick={(event) => handleDelete(event, profile)}
                />
              </li>
            </ul>
          );
        })}
      </div>
    </section>
  );
}

export default Profiles;
