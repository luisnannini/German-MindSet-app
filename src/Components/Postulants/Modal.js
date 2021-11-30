import style from './postulants-Modal.module.css';

const Modal = ({ modal, forwardState, closeModal }) => {
  if (modal.type === 'confirm') {
    return (
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <h2>{modal.title}</h2>
          <p>{modal.message}</p>
          <div>
            <button onClick={() => closeModal({ state: !modal.state })} title="Cancel">
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
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <button
          onClick={() =>
            modal.action ? modal.action(modal.actionParam) : closeModal({ state: !modal.state })
          }
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
