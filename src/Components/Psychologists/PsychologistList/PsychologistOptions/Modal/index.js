import styles from './modal.module.css';

const Modal = (props) => {
  return <div className={props.visible ? '' : styles.hideModal}>test</div>;
};

export default Modal;
