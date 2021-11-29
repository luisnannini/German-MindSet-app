import styles from './modalDel.module.css';
import Button from '../../../Button';

const Modal = (props) => {
  return (
    <div className={props.visible ? '' : styles.hideModal}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.header}>
            <h2>
              ARE YOU SURE YOU WANT TO DELETE {props.psy.firstName} {props.psy.lastName}
            </h2>
          </div>
          <div className={styles.header}>
            <Button class={styles.greenButton} action={props.action} name={'Confirm'} />
            <Button class={styles.redButton} name={'Cancel'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
