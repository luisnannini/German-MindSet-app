import styles from './modalDel.module.css';

const Modal = (props) => {
  return (
    <div className={props.visible ? '' : styles.hideModal}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div> borrar</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
