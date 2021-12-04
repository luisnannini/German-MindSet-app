import styles from './modal.module.css';
import Form from '../Form';
import Update from '../Update';
import Remove from '../Remove';
const Modal = (props) => {
  if (props.show == false) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Form onClose={props.onClose} showForm={props.showForm} />
        <Update onClose={props.onClose} showUpdate={props.showUpdate} updateId={props.updateId} />
        <Remove
          showRemove={props.showRemove}
          onClose={props.onClose}
          removeConfirm={props.removeConfirm}
        />
      </div>
    </div>
  );
};

export default Modal;
