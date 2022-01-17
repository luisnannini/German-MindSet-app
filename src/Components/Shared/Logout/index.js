import { useHistory } from 'react-router-dom';
import styles from './logout.module.css';
import { logOutUser } from 'helper/firebase';

const Logout = () => {
  const history = useHistory();

  const logOut = () => {
    sessionStorage.removeItem('token');
    logOutUser();
    history.replace('/auth/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Are you sure you want to logout ?</h1>
      <button className={styles.button} onClick={() => logOut()}>
        Yes
      </button>
    </div>
  );
};

export default Logout;
