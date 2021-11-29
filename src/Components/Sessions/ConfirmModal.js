import styles from './sessions.module.css';
import ModalContent from './ModalContent';

const Modal = ({ onClose, onDelete }) => {
  return (
    <div className={styles.modal}>
      <ModalContent onClose={onClose} onDelete={onDelete} />
    </div>
  );
};

export default Modal;
