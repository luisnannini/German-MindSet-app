import React, { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import List from './List';
import CreateButton from './CreateButton';
import CreateForm from './CreateForm';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response.data);
      });
  }, []);

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  return (
    <section className={styles.container}>
      <CreateForm show={showCreateForm} closeCreateForm={closeCreateForm} />
      <h1>Interviews</h1>
      <ul className={styles.list1}>
        <li>Postulant</li>
        <li>Client</li>
      </ul>
      <ul className={styles.list2}>
        <li>First Name</li>
        <li>Last Name</li>
        <li>Name</li>
        <li>Status</li>
        <li>Date</li>
        <li>Notes</li>
        <li>Actions</li>
      </ul>
      <div>
        {interviews.map((interview) => {
          return (
            <div>
              <List
                href={`/interviews/form?id=${interview.id}`}
                key={interview._id}
                postulant={interview.postulant}
                client={interview.client}
                // application={interview.application}
                status={interview.status}
                date={interview.date}
                notes={interview.notes}
              />
            </div>
          );
        })}
      </div>
      <div>
        <CreateButton onClick={() => setShowCreateForm(true)} />
      </div>
    </section>
  );
}

export default Interviews;
