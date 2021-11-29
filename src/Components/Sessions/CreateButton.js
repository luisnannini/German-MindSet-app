import { FaPlusCircle } from 'react-icons/fa';
import styles from './sessions.module.css';

const CreateButton = ({ onCreate }) => {
  return (
    <button className={styles.addButton} onClick={onCreate}>
      <FaPlusCircle />
    </button>
  );
};

export default CreateButton;
