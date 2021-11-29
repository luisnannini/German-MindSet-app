import styles from './sessions.module.css';

const ModalContent = ({ onClose, onDelete }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h3>Warning!</h3>
      </div>
      <div className={styles.confirmModalContent}>
        <p>Delete session?</p>
        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
