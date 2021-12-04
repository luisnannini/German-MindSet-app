import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import styles from './session.module.css';

const Session = ({ postulant, psychologist, status, date, onDelete, id }) => {
  return (
    <tr className={styles.tr}>
      <td>{postulant}</td>
      <td>{psychologist}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <Link to={`sessions/form?id=${id}`}>
          <FaPen />
        </Link>
        <FaTrash onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Session;
