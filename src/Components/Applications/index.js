import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './applications.module.css';
import ButtonCreate from '../Shared/ButtonCreate';
import ButtonDelete from '../Shared/ButtonDelete';
import Modal from '../Shared/Modal';
import ModalError from '../Shared/ModalError';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/applications`)
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
        setApplications(response.data);
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    setShowRemove(false);
    setLoading(true);
    await fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return fetch(`${process.env.REACT_APP_API}/applications`)
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
            setApplications(response.data);
          });
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }))
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section}>
      <Modal
        show={!!showRemove}
        title="Delete Application"
        message="Are you sure you want to delete this application?"
        onCancel={() => {
          setShowRemove(false);
        }}
        onConfirm={() => {
          remove(showRemove);
          setShowRemove(false);
        }}
      />
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Applications</h2>
          <Link to="/applications/form">
            <ButtonCreate disabled={isLoading} />
          </Link>
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
                  <ButtonDelete onClick={() => setShowRemove(app._id)} disabled={isLoading} />
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
