import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Table from './Table/Table.js';
import Modal from './Modal/Modal.js';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <div>
        {applications.map((app) => {
          return <div key={app._id}>{app.email}</div>;
        })}
      </div>
      <button
        className="add-button"
        onClick={() => {
          setShow(true);
          setShowForm(true);
        }}
      >
        Add Application
      </button>
      <Table applications={applications} />
      <Modal
        onClose={() => {
          setShow(false);
          setShowForm(false);
        }}
        show={show}
        showForm={showForm}
      ></Modal>
    </section>
  );
}

export default Applications;
