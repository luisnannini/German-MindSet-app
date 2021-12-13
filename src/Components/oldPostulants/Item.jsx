// import style from './postulants-Item.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalError from '../Shared/ModalError';
import Modal from '../Shared/Modal/';
import ButtonUpdate from '../Shared/Buttons/ButtonUpdate';
import ButtonDelete from '../Shared/Buttons/ButtonDelete';

function Item({ postulant, fetchData, url }) {
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);
      fetchData();
    } catch (error) {
      setShowModal({ state: false });
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
          <ButtonUpdate />
        </Link>
      </td>
      <td>
        <ButtonDelete onClick={() => setShowModal(true)} />
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
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
