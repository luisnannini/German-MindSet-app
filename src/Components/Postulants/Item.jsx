// import style from './postulants-Item.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import ModalError from '../Shared/Modal-Error/modal-error';

function Item({ postulant, fetchData, url }) {
  const [modalState, setModalState] = useState({ state: false });
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const confirmDelete = async (id) => {
    try {
      const responseRaw = await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        const status = `${responseRaw.status} ${responseRaw.statusText}`;
        const { message } = await responseRaw.json();
        if (message.message) throw { message: message.message, status };
        throw { message, status };
      }
      setModalState({ state: false });
      fetchData();
    } catch (error) {
      setModalState({ state: false });
      setError({ show: true, message: error.message, title: error.status });
    }
  };

  return (
    <tr>
      {Object.keys(postulant).map((postulantKey) => {
        if (typeof postulant[postulantKey] === 'boolean') {
          return (
            <td key={postulant[postulantKey]}>
              <input type="checkbox" checked={postulant[postulantKey]} disabled={true}></input>
            </td>
          );
        }
        return <td key={postulant[postulantKey]}>{postulant[postulantKey]}</td>;
      })}
      <td>
        <Link to={`postulants/form?id=${postulant._id}`}>
          <button>Edit</button>
        </Link>
      </td>
      <td>
        <button
          onClick={() =>
            setModalState({
              action: confirmDelete,
              actionParam: postulant._id,
              state: !modalState.state,
              title: 'Delete',
              message: 'Are you sure?',
              type: 'confirm',
              close: () => setModalState({ state: modalState.state })
            })
          }
        >
          Delete
        </button>
        {modalState.state && <Modal modal={modalState} closeModal={setModalState} />}
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
      </td>
    </tr>
  );
}

export default Item;
