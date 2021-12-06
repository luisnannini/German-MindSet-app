import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './profiles.module.css';
import Modal from './Modal';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
            setShowModal(false);
            setProfiles(response.data);
            setShowSuccessModal(true);
            setSuccess('You request was successful!');
          });
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
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
      <Modal
        show={showSuccessModal}
        title="Successful"
        message={success}
        onCancel={closeModal}
        hideButton={true}
      />
      <Modal
        show={showErrorModal}
        title="Error"
        message={error}
        onCancel={closeModal}
        hideButton={true}
      />
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
                <Link to={`profiles/form?id=${profile._id}`}>
                  <ButtonUpdate />
                </Link>
              </li>
              <li>
                <ButtonDelete onClick={(event) => handleDelete(event, profile)} />
              </li>
            </ul>
          );
        })}
      </div>
      <div className={styles.button}>
        <Link to="./profiles/form">
          <ButtonCreate />
        </Link>
      </div>
    </section>
  );
}

export default Profiles;
