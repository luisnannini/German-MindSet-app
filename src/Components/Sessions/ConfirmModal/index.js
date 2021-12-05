import styles from './confirmModal.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

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
            <ButtonCancel onClick={onClose} />
            <ButtonConfirm onClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
