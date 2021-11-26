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
        id={'ID'}
        client={'Client'}
        profiles={'Professional Profiles'}
        jobDescription={'Job Description'}
        vacancy={'Vacancy'}
        isOpen={'isOpen'}
        update={''}
        delete={''}
      />
    </section>
  );
}

export default Positions;
