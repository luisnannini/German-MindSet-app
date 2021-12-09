import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './interviews.module.css';
import ButtonCreate from '../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(undefined);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
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
        setInterviews(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, interview) => {
    event.stopPropagation();
    setSelectedInterview(interview._id);
  };

  const deleteInterview = () => {
    setLoading(true);
    setShowDelete(false);
    const url = `${process.env.REACT_APP_API}/interviews/${selectedInterview}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/interviews`)
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
            setInterviews(response.data);
          });
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section}>
      <Modal
        show={showDelete}
        title="Delete Interview"
        message="Are you sure you want to delete this interview?"
        onConfirm={deleteInterview}
        onCancel={() => setShowDelete(false)}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Interviews</h2>
          <Link to="interviews/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Postulant</th>
              <th></th>
              <th>Client</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Name</th>
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
                  <td>{interview.application.result}</td>
                  <td>{interview.status}</td>
                  <td>{interview.date.replace('T00:00:00.000Z', '')}</td>
                  <td>{interview.notes}</td>
                  <td>
                    <Link to={`interviews/form?id=${interview._id}`}>
                      <ButtonUpdate disabled={isLoading} />
                    </Link>
                    <ButtonDelete
                      disabled={isLoading}
                      onClick={(event) => {
                        handleDelete(event, interview);
                        setShowDelete(true);
                      }}
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

export default Interviews;
