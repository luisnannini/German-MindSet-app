import style from './postulants-Modal.module.css';
import { useState, useEffect } from 'react';

const Modal = ({ modal, closeModal }) => {
  const [modalState, setModalState] = useState(false);
  useEffect(() => (modal.state = false), [modalState]);
  if (modal.type === 'confirm') {
    return (
      <div className={modal.state ? style.modalBackground : style.hide}>
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
    <div className={modal.state ? style.modalBackground : style.hide}>
      <div className={style.modal}>
        <h2>{modal.title}</h2>
        <p>{modal.message}</p>
        <button onClick={() => (modal.action ? modal.action(modal.actionParam) : setModalState())}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
