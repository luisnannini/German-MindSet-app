import styles from './remove.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

const Remove = (props) => {
  if (props.showRemove == false) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Do you want to delete ?</h2>
      <div className={styles.buttons}>
        <ButtonCancel onClick={props.onClose} />
        <ButtonConfirm onClick={props.removeConfirm} />
      </div>
    </div>
  );
};

export default Remove;
