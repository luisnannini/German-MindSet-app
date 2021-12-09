import { Link } from 'react-router-dom';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../../Shared/Buttons/ButtonUpdate';

const Session = ({ postulant, psychologist, status, date, notes, id, disabled, onDelete }) => {
  return (
    <tr>
      <td>{postulant}</td>
      <td>{psychologist}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>{notes}</td>
      <td>
        <Link to={`sessions/form?id=${id}`}>
          <ButtonUpdate disabled={disabled} />
        </Link>
        <ButtonDelete disabled={disabled} onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Session;
