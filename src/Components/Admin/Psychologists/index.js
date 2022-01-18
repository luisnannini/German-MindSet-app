import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologists, deletePsychologist } from 'redux/Psychologists/thunks';
import { closeErrorModal } from 'redux/Psychologists/actions';
import styles from './psychologists.module.css';
import ButtonCreate from 'Components/Shared/Buttons/ButtonCreate';
import ButtonDelete from 'Components/Shared/Buttons/ButtonDelete';
import ButtonUpdate from 'Components/Shared/Buttons/ButtonUpdate';
import ModalDelete from 'Components/Shared/Modals/ModalDelete';
import ModalError from 'Components/Shared/Modals/ModalError';
import Loader from 'Components/Shared/Loader';

function Psychologists() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const psychologists = useSelector((store) => store.psychologists.list);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  const error = useSelector((store) => store.psychologists.error);

  useEffect(() => {
    if (!psychologists.length) {
      dispatch(getPsychologists());
    }
  }, [psychologists]);

  const handleDelete = (event, psy) => {
    event.stopPropagation();
    setShowDelete(true);
    setSelectedPsychologist(psy._id);
  };

  return (
    <section className={styles.section}>
      <ModalDelete
        show={showDelete}
        title="Delete a Psychologist"
        message="Are you sure you want to delete this psychologist?"
        onConfirm={() => {
          dispatch(deletePsychologist(selectedPsychologist)).then(() => {
            setSelectedPsychologist(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Psychologist</h2>
          <ButtonCreate
            disabled={isLoading}
            onClick={() => history.push('/admin/psychologists/form')}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.map((psychologist) => {
              return (
                <tr key={psychologist._id} className={styles.list}>
                  <td>{psychologist.firstName}</td>
                  <td>{psychologist.lastName}</td>
                  <td>{psychologist.username}</td>
                  <td>{psychologist.email}</td>
                  <td>{psychologist.phone}</td>
                  <td>{psychologist.address}</td>
                  <td>
                    <ButtonUpdate
                      disabled={isLoading}
                      onClick={() =>
                        history.push(`/admin/psychologists/form?_id=${psychologist._id}`)
                      }
                    />
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, psychologist)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <Loader />}
    </section>
  );
}

export default Psychologists;
