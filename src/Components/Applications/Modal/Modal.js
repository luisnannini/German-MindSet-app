import './Modal.css';
import Form from '../Form/Form.js';
import Remove from '../Remove/Remove.js';
const Modal = (props) => {
  if (props.show == false) {
    return null;
  }
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div>
          <h3>Some text in the Modal..</h3>
          <span className="close" onClick={props.onClose}>
            &times;
          </span>
        </div>
        <Form onClose={props.onClose} showForm={props.showForm} />
        <Remove
          showRemove={props.showRemove}
          onClose={props.onClose}
          removeConfirm={props.removeConfirm}
        />
      </div>
    </div>
  );
};

export default Modal;
