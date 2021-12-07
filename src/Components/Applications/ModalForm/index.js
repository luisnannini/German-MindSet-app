import styles from './modal.module.css';
import Form from '../Form';

const ModalForm = (props) => {
  if (props.show == false) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Form onClose={props.onClose} showForm={props.showForm} />
      </div>
    </div>
  );
};

export default ModalForm;
