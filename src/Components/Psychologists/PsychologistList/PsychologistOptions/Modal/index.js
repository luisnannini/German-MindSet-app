import styles from './modal.module.css';
import Form from '../../../Form';

const Modal = (props) => {
  return (
    <div className={props.visible ? '' : styles.hideModal}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div>
            <Form data={props.psy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
