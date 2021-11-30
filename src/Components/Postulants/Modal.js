import style from './postulants-Modal.module.css';
import Button from './Button';

const Modal = ({ setModal, modal, modal: { title, state, message, action, type, id } }) => {
  if (type === 'confirm') {
    return (
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <h2>{title}</h2>
          <p>{message}</p>
          <div>
            <Button onClick={() => setModal({ ...modal, state: !state })} title="Cancel" />
            <Button onClick={() => action(id)} title="Ok" />
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className={state ? style.modalBackground : style.hide}>
        <div className={style.modal}>
          <h2>{title}</h2>
          <p>{message}</p>
          <Button
            onClick={() => (action ? action() : setModal({ ...modal, state: !state }))}
            title="Ok"
          />
        </div>
      </div>
    );
};

export default Modal;
