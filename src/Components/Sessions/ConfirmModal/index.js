import styles from './confirmModal.module.css';

const ConfirmModal = ({ onClose, onDelete }) => {
  return (
    <div className={styles.modal}>
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
    </div>
  );
};

export default ConfirmModal;
