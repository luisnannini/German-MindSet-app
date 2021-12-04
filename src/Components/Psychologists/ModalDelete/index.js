import styles from './modalDelete.module.css';
import Button from '../Button';

const ModalDelete = (props) => {
  return (
    <div className={props.visible ? '' : styles.hideModal}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.header}>
            <h2>ARE YOU SURE YOU WANT TO DELETE THIS PSYCHOLOGIST?</h2>
          </div>
          <div className={styles.header}>
            <Button class={styles.greenButton} action={props.action} name={'Confirm'} />
            <Button class={styles.redButton} action={props.close} name={'Cancel'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
