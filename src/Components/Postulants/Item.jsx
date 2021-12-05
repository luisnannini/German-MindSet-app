// import style from './postulants-Item.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import ButtonUpdate from '../Shared/ButtonUpdate';
import ButtonDelete from '../Shared/ButtonDelete';

function Item({ postulant, fetchData, url }) {
  const [modalState, setModalState] = useState({ state: false });
  const confirmDelete = async (id) => {
    let responseRaw;
    let status;
    let serverError;
    try {
      responseRaw = await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      status = responseRaw.status + ' ' + responseRaw.statusText;
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        serverError = status;
        throw new Error(serverError);
      }
      setModalState({ state: false });
      fetchData();
    } catch (error) {
      if (serverError) {
        setModalState({
          title: 'Error',
          state: true,
          message: serverError,
          action: () => setModalState({ state: false })
        });
      } else {
        setModalState({
          title: 'Error',
          state: true,
          message: 'A local error has ocurred',
          action: () => setModalState({ state: false })
        });
      }
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
          <ButtonUpdate />
        </Link>
      </td>
      <td>
        <ButtonDelete
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
        />
        {modalState.state && <Modal modal={modalState} closeModal={setModalState} />}
      </td>
    </tr>
  );
}

export default Item;
