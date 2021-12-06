import { Link } from 'react-router-dom';
import styles from './session.module.css';
import ButtonUpdate from '../../Shared/ButtonUpdate';
import ButtonDelete from '../../Shared/ButtonDelete';

const Session = ({ postulant, psychologist, status, date, onDelete, id }) => {
  return (
    <tr className={styles.tr}>
      <td>{postulant}</td>
      <td>{psychologist}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <Link to={`sessions/form?id=${id}`}>
          <ButtonUpdate />
        </Link>
        <ButtonDelete onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Session;
