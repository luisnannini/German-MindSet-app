import style from './postulants-Item.module.css';
import { useState } from 'react';
import Modal from './Modal';

//si se clickea el delete, sólo se re-renderiza Item
function Item({ postulant, fetchData, setForm }) {
  const url = `${process.env.REACT_APP_API}/postulants`;
  const [modalState, setModalState] = useState({ state: false });

  const confirmDelete = async (id) => {
    //al apretar confirm en el modal
    /* try {
      await fetch(`${url}?id=${234234}`, {
        method: 'DELETE'
      });
      //fetchData();
      setModalState({ title: 'Deleted', state: true, message: 'Deletion successfull' });
    } catch (error) {
      console.log(error);
      setModalState({ title: 'Error', state: true, message: 'Error deleting' });
    } */
    setModalState({ title: 'Deleted', state: true, message: 'Deletion successfull' });
  };

  return (
    <tr>
      {Object.keys(postulant).map((postulantKey) => {
        if (typeof postulant[postulantKey] === 'boolean') {
          return (
            <td>
              <input
                key={postulant[postulantKey]}
                type="checkbox"
                checked={postulant[postulantKey]}
                disabled={true}
              ></input>
            </td>
          );
        }
        return <td>{postulant[postulantKey]}</td>;
      })}
      <td>
        <button onClick={() => setForm(postulant._id)}>Edit</button>
      </td>
      <td>
        <button
          onClick={() =>
            setModalState({
              //se pasa el mensaje y la accion de 'OK'
              actionParam: postulant._id,
              state: !modalState.state,
              title: 'Delete',
              message: 'Are you sure?',
              action: confirmDelete,
              type: 'confirm'
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
