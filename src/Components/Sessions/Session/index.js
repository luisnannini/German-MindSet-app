import { Link } from 'react-router-dom';
import styles from './session.module.css';
import ButtonUpdate from '../../Shared/ButtonUpdate';
import ButtonDelete from '../../Shared/ButtonDelete';

const Session = ({ postulant, psychologist, status, date, notes, onDelete, id, disabled }) => {
  return (
    <tr className={styles.tr}>
      <td>{postulant ? `${postulant.firstName} ${postulant.lastName}` : 'Unassigned'}</td>
      <td>{psychologist ? `${psychologist.firstName} ${psychologist.lastName}` : 'Unassigned'}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <Link
          to={{
            pathname: '/sessions/form',
            search: `id=${id}`,
            state: {
              postulant: postulant ? postulant._id : '',
              psychologist: psychologist ? psychologist._id : '',
              status,
              date,
              notes
            }
          }}
        >
          <ButtonUpdate disabled={disabled} />
        </Link>
        <ButtonDelete disabled={disabled} onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Session;
