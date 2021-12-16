import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles, deleteProfile } from '../../../redux/Profiles/thunks';
import { closeErrorModal } from '../../../redux/Profiles/actions';
import { useHistory } from 'react-router-dom';
import styles from './profiles.module.css';
import ButtonCreate from '../../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../../Shared/Buttons/ButtonUpdate';
import ModalDelete from '../../Shared/Modals/ModalDelete';
import ModalError from '../../Shared/Modals/ModalError';

function Profiles() {
  const history = useHistory();
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles.list);
  const [selectedProfile, setSelectedProfile] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.profiles.isLoading);
  const error = useSelector((store) => store.profiles.error);

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
      <ModalDelete
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
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Profiles</h2>
          <ButtonCreate disabled={isLoading} onClick={() => history.push('/admin/profiles/form')} />
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
                    <ButtonUpdate
                      disabled={isLoading}
                      onClick={() => history.push(`/admin/profiles/form?_id=${profile._id}`)}
                    />
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
