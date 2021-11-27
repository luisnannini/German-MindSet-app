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
          update={''}
          delete={''}
        />
        <div>
          {positions.map((position) => {
            return (
              <List
                client={position.client.name}
                profiles={position.professionalProfiles}
                jobDescription={position.jobDescription}
                vacancy={position.vacancy}
                isOpen={position.isOpen ? 'Yes' : 'No'}
                update={''}
                delete={''}
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
