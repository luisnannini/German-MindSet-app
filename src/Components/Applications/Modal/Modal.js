import './Modal.css';
import Form from '../Form/Form.js';
import Update from '../Update/Update.js';
import Remove from '../Remove/Remove.js';
const Modal = (props) => {
  if (props.show == false) {
    return null;
  }
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div>
          <h3>Application</h3>
          <span className="close" onClick={props.onClose}>
            &times;
          </span>
        </div>
        <Form onClose={props.onClose} showForm={props.showForm} />
        <Update onClose={props.onClose} showUpdate={props.showUpdate} updateId={props.updateId} />
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
