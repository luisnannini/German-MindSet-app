import style from './postulants-Modal.module.css';
import ButtonCancel from '../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../Shared/Buttons/ButtonConfirm';

const Modal = ({ modal }) => {
  if (modal.type === 'confirm') {
    return (
      <div className={modal.state ? style.modalBackground : style.hide}>
        <div className={style.modal}>
          <h2>{modal.title}</h2>
          <p>{modal.message}</p>
          <div>
            <ButtonCancel onClick={() => modal.close()} />
            <ButtonConfirm onClick={() => modal.action(modal.actionParam)} />
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
        <ButtonConfirm
          onClick={() => {
            modal.action(modal.actionParam);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
