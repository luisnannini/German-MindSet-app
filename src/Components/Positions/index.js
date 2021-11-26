import styles from './positions.module.css';
import List from './List';

function Positions() {
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
