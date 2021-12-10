import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './profiles.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles, deleteProfile } from '../../redux/Profiles/thunks';

function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.profiles.list);
  const error = useSelector((store) => store.profiles.error);
  const isLoading = useSelector((store) => store.profiles.isLoading);

  useEffect(() => {
    if (!profiles.length) {
      dispatch(getProfiles());
    }
  }, [profiles]);

  const handleDelete = (event, profile) => {
    event.stopPropagation();
    setSelectedProfile(profile._id);
    setShowDelete(true);
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete a Profile"
        message="Are you sure you want to delete this profile?"
        onConfirm={() => {
          dispatch(deleteProfile(selectedProfile)).then(() => {
            setSelectedProfile(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error.show} onConfirm={() => dispatch(error({ show: false }))} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Profiles</h2>
          <Link to="./profiles/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profiles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => {
              return (
                <tr key={profile._id}>
                  <td>{profile.name}</td>
                  <td>
                    <Link to={`profiles/form?id=${profile._id}`}>
                      <ButtonUpdate disabled={isLoading} />
                    </Link>
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, profile)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Profiles;
