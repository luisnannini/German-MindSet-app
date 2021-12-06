import styles from './modalDelete.module.css';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';

const ModalDelete = (props) => {
  return (
    <div className={props.visible ? '' : styles.hideModal}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.header}>
            <h2>ARE YOU SURE YOU WANT TO DELETE THIS PSYCHOLOGIST?</h2>
          </div>
          <div className={styles.header}>
            <ButtonCancel onClick={props.close} />
            <ButtonConfirm onClick={props.action} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
