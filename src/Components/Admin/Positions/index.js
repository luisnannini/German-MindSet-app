import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions, deletePosition } from 'redux/Positions/thunks';
import { closeErrorModal } from 'redux/Positions/actions';
import styles from './positions.module.css';
import ButtonCreate from 'Components/Shared/Buttons/ButtonCreate';
import ButtonDelete from 'Components/Shared/Buttons/ButtonDelete';
import ButtonUpdate from 'Components/Shared/Buttons/ButtonUpdate';
import ModalDelete from 'Components/Shared/Modals/ModalDelete';
import ModalError from 'Components/Shared/Modals/ModalError';

function Positions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const [selectedPosition, setSelectedPosition] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
  }, [positions]);

  const handleDelete = (event, pos) => {
    event.stopPropagation();
    setShowDelete(true);
    setSelectedPosition(pos._id);
  };

  return (
    <section className={styles.section}>
      <ModalDelete
        show={showDelete}
        title="Delete a Position"
        message="Are you sure you want to delete this position?"
        onCancel={() => setShowDelete(false)}
        onConfirm={() =>
          dispatch(deletePosition(selectedPosition)).then(() => {
            setSelectedPosition(undefined);
            setShowDelete(false);
          })
        }
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Positions</h2>
          <ButtonCreate
            disabled={isLoading}
            onClick={() => history.push('/admin/positions/form')}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Profiles</th>
              <th>Job Description</th>
              <th>Vacancy</th>
              <th>Is Open</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return (
                <tr key={position._id}>
                  <td>{position.client.name}</td>
                  <td>{position.professionalProfiles.name}</td>
                  <td>{position.jobDescription}</td>
                  <td>{position.vacancy}</td>
                  <td>{position.isOpen ? 'Yes' : 'No'}</td>
                  <td>
                    <ButtonUpdate
                      disabled={isLoading}
                      onClick={() => history.push(`/admin/positions/form?_id=${position._id}`)}
                    />
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, position)}
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

export default Positions;
