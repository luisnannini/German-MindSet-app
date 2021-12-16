import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologists, deletePsychologist } from '../../../redux/Psychologists/thunks';
import { closeErrorModal } from '../../../redux/Psychologists/actions';
import { useHistory } from 'react-router-dom';
import styles from './psychologists.module.css';
import ButtonCreate from '../../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../../Shared/Buttons/ButtonUpdate';
import ButtonAvailability from '../../Shared/Buttons/ButtonAvailability';
import ModalDelete from '../../Shared/Modals/ModalDelete';
import ModalError from '../../Shared/Modals/ModalError';
import ModalAvailability from '../../Shared/Modals/ModalAvailability';

function Psychologists() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const psychologists = useSelector((store) => store.psychologists.list);
  const [availability, setAvailability] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
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

  const handleAvailability = (event, psy) => {
    event.stopPropagation();
    // setSelectedPsychologist(psy._id);
    setAvailability(psy.availability);
    setShowAvailability(true);
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
      <ModalAvailability
        show={showAvailability}
        title="Availability"
        data={availability}
        onCancel={() => {
          setShowAvailability(false);
          setAvailability({});
        }}
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
              <th>Availability</th>
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
                    <ButtonAvailability
                      disabled={isLoading}
                      onClick={(event) => handleAvailability(event, psychologist)}
                    />
                  </td>
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
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Psychologists;
