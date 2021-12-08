import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Table from './Table';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';
import ButtonCreate from '../Shared/ButtonCreate';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [showRemove, setShowRemove] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
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
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
  }, []);

  const remove = async (id) => {
    setShowRemove(false);
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
          })
          .catch((error) => setError({ show: true, message: error.message, title: error.status }));
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Applications</h2>
        <Link to="/applications/form">
          <ButtonCreate />
        </Link>
      </div>
      <Table applications={applications} removeReq={setShowRemove} />
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
    </section>
  );
}

export default Applications;
