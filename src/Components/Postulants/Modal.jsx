import style from './postulants-Modal.module.css';

const Modal = ({ modal }) => {
  if (modal.type === 'confirm') {
    return (
      <div className={modal.state ? style.modalBackground : style.hide}>
        <div className={style.modal}>
          <h2>{modal.title}</h2>
          <p>{modal.message}</p>
          <div>
            <button onClick={() => modal.close()} title="Cancel">
              Cancel
            </button>
            <button onClick={() => modal.action(modal.actionParam)} title="Ok">
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={modal.state ? style.modalBackground : style.hide}>
      <div className={style.modal}>
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <button
          onClick={() => {
            modal.action(modal.actionParam);
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
