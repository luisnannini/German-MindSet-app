import { useState, useEffect } from 'react';
import styles from './positions.module.css';
import List from './List';
import CreateButton from './CreateButton';
import Form from './Form';

function Positions() {
  const [positions, setPositions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response.data);
      });
  }, []);

  const deletePosition = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/positions/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json(`Id: ${id}`);
      })
      .catch((error) => error);
  };

  return (
    <section>
      <div className={styles.list}>
        <h2>Positions</h2>
        <List
          client={'Client'}
          profiles={'Professional Profiles'}
          jobDescription={'Job Description'}
          vacancy={'Vacancy'}
          isOpen={'Is Open'}
        />
        <div>
          {positions.map((position) => {
            return (
              <List
                key={position._id}
                client={position.client.name}
                profiles={position.professionalProfiles}
                jobDescription={position.jobDescription}
                vacancy={position.vacancy}
                isOpen={position.isOpen ? 'Yes' : 'No'}
                update={''}
                onDelete={() => deletePosition(position._id)}
              />
            );
          })}
        </div>
        {showForm && <Form />}
      </div>
      <div className={styles.button}>
        <CreateButton onClick={() => setShowForm(true)} />
      </div>
    </section>
  );
}

export default Positions;
