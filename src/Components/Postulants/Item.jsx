// import style from './postulants-Item.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Shared/Modal';
import ButtonUpdate from '../Shared/ButtonUpdate';

function Item({ postulant, fetchData, url }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

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
      setShowModal(false);
      fetchData();
    } catch (error) {
      if (serverError) {
        setShowModalError({
          title: 'Error',
          state: true,
          message: serverError,
          action: () => setShowModalError(false)
        });
      } else {
        showModalError({
          title: 'Error',
          state: true,
          message: 'A local error has ocurred',
          action: () => setShowModalError(false)
        });
      }
    }
    setShowModal({ state: false });
    fetchData();
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
        <button onClick={() => setShowModal(true)}>Delete</button>
        <Modal
          show={showModal}
          title="Delete Postulant"
          message="Are you sure you want to delete this postulant?"
          onCancel={() => setShowModal(false)}
          onConfirm={() => confirmDelete(postulant._id)}
        />
      </td>
    </tr>
  );
}

export default Item;
