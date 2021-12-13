import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './applications.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications, deleteApplication } from '../../redux/Applications/thunks';
import { applicationsErrorModal } from '../../redux/Applications/actions';

function Applications() {
  const [selectedApplication, setSelectedApplication] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const applications = useSelector((store) => store.applications.list);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const error = useSelector((store) => store.applications.error);

  useEffect(() => {
    if (!applications.length) {
      dispatch(getApplications());
    }
  }, [applications]);

  const handleDelete = (event, application) => {
    event.stopPropagation();
    setSelectedApplication(application._id);
    setShowDelete(true);
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        onConfirm={() => {
          dispatch(deleteApplication(selectedApplication)).then(() => {
            setSelectedApplication(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => dispatch(applicationsErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Applications</h2>
          <ButtonCreate disabled={isLoading} onClick={() => history.push('/applications/form')} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Position</th>
              <th>Postulant</th>
              <th>ID Interview</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>{app.positions.jobDescription}</td>
                <td>
                  {app.postulants.firstName} {app.postulants.lastName}
                </td>
                <td>{app.interview._id}</td>
                <td>{app.result}</td>
                <td>
                  <ButtonDelete
                    onClick={(event) => handleDelete(event, app)}
                    disabled={isLoading}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Applications;
