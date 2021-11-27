import { useState, useEffect } from 'react';
import styles from './positions.module.css';
import List from './List';

function Positions() {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response.data);
      });
  }, []);
  return (
    <section className={styles.container}>
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
              key={position._id}
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
    </section>
  );
}

export default Positions;
