import styles from './positions.module.css';
import List from './List';

function Positions() {
  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <List />
    </section>
  );
}

export default Positions;
