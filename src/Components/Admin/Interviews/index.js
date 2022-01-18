import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/Interviews/thunks';
import { closeErrorModal } from 'redux/Interviews/actions';
import styles from './interviews.module.css';
import ButtonCreate from 'Components/Shared/Buttons/ButtonCreate';
import ButtonDelete from 'Components/Shared/Buttons/ButtonDelete';
import ButtonUpdate from 'Components/Shared/Buttons/ButtonUpdate';
import ModalDelete from 'Components/Shared/Modals/ModalDelete';
import ModalError from 'Components/Shared/Modals/ModalError';
import Loader from 'Components/Shared/Loader';

function Interviews() {
  const history = useHistory();
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  const [selectedInterview, setSelectedInterview] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);

  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, [interviews]);

  const handleDelete = (event, interview) => {
    event.stopPropagation();
    setSelectedInterview(interview._id);
    setShowDelete(true);
  };

  return (
    <section className={styles.section}>
      <ModalDelete
        show={showDelete}
        title="Delete Interview"
        message="Are you sure you want to delete this interview?"
        onConfirm={() => {
          dispatch(deleteInterview(selectedInterview)).then(() => {
            setSelectedInterview(undefined);
            setShowDelete(false);
          });
        }}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Interviews</h2>
          <ButtonCreate
            disabled={isLoading}
            onClick={() => history.push('/admin/interviews/form')}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Client</th>
              <th>ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => {
              return (
                <tr className={styles.list} key={interview._id}>
                  <td>{interview.postulant.firstName}</td>
                  <td>{interview.postulant.lastName}</td>
                  <td>{interview.client.name}</td>
                  <td>{interview._id}</td>
                  <td>{interview.status}</td>
                  <td>{interview.date.replace('T', ' ')}</td>
                  <td>{interview.notes}</td>
                  <td>
                    <ButtonUpdate
                      disabled={isLoading}
                      onClick={() => history.push(`/admin/interviews/form?_id=${interview._id}`)}
                    />
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => handleDelete(event, interview)}
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

export default Interviews;
