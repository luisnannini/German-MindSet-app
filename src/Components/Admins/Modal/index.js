import styles from './modal.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

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
          <ButtonCancel disabled={isLoading} onClick={() => onCancel()} className={styles.button} />
          <ButtonConfirm
            disabled={isLoading}
            onClick={() => onConfirm()}
            className={styles.button}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
