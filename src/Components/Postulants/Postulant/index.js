import styles from './postulant.module.css';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';

const Postulant = ({ id, name, age, address, status, profiles, onDelete, onEdit }) => {
  return (
    <tr className={styles.tr}>
      <td>{name}</td>
      <td>{age}</td>
      <td>{address}</td>
      <td>{status ? 'Available' : 'Unavailable'}</td>
      <td>
        {profiles.map((profile, index) => {
          if (index == profiles.length - 1) {
            return profile.profileId.name;
          } else {
            return `${profile.profileId.name}, `;
          }
        })}
      </td>
      <td>
        <FaEye></FaEye>
      </td>
      <td>
        <FaPen onClick={() => onEdit()} />
        <FaTrash onClick={() => onDelete()} />
      </td>
    </tr>
  );
};

export default Postulant;
