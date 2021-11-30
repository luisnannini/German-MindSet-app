import styles from './remove.module.css';
const Remove = (props) => {
  if (props.showRemove == false) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Do you want to delete ?</h2>
      <div className={styles.buttons}>
        <button onClick={props.onClose}>Cancel</button>
        <button onClick={props.removeConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Remove;
