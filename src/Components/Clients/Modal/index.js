import styles from './modal.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <section className={styles.container}>
      <div className={styles.modal}>
        <h4>{props.title}</h4>
        <div>
          <ButtonCancel disabled={props.isLoading} onClick={props.onCancel} />
          <ButtonConfirm disabled={props.isLoading} onClick={props.onConfirm} />
        </div>
      </div>
    </section>
  );
}

export default Modal;
