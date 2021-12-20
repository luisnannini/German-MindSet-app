import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <Link to={'postulant/signup'}>Signup</Link>
    </section>
  );
}

export default Home;
