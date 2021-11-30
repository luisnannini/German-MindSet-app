import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import styles from './session.module.css';

const Session = ({ postulant, psychologist, status, date, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{postulant}</td>
      <td>{psychologist}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <FaPen className={styles.button} onClick={() => onEdit()} />
        <FaTrash onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Session;
