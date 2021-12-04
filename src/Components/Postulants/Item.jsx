// import style from './postulants-Item.module.css';
import { useState } from 'react';
import Modal from './Modal';

function Item({ postulant, fetchData, url, setFormId }) {
  //doFetch sirve para el delete y formId sirve para el edit
  const [modalState, setModalState] = useState({ state: false });
  const confirmDelete = async (id) => {
    try {
      await fetch(`${url}?id=${id}`, {
        method: 'DELETE'
      });
      setModalState({ state: false });

      fetchData();
    } catch (error) {
      setModalState({ title: 'Error', state: true, message: 'Error deleting' });
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
        <button onClick={() => setFormId(postulant._id)}>Edit</button>
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
      </td>
    </tr>
  );
}

export default Item;
