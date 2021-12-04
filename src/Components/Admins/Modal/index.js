import styles from './modal.module.css';

const Modal = (props) => {
  const { onCancel, onConfirm, isLoading, show } = props;
  if (!show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Are you sure you want to delete this administrator?</h2>
        </div>
        <div className={styles.header}>
          <button disabled={isLoading} onClick={() => onCancel()} className={styles.button}>
            Cancel
          </button>
          <button disabled={isLoading} onClick={() => onConfirm()} className={styles.button}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
