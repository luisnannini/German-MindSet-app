import { useHistory } from 'react-router-dom';
import styles from './logout.module.css';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/Auth/thunks';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logOut = () => {
    sessionStorage.removeItem('token');
    history.replace('/');
    dispatch(logout());
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
