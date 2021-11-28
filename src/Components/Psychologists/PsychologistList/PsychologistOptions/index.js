import { useState } from 'react';
import Modal from './Modal';
import Button from '../../Button';
import ModalDel from './ModalDel';

const Options = (props) => {
  const [modal, changeModal] = useState(false);
  const [modalDel, changeModalDel] = useState(false);

  const modalOpenDel = () => {
    changeModalDel(!modalDel);
  };

  const modalOpen = () => {
    changeModal(!modal);
  };

  /*const deletePosition = async (id) => {
    await fetch(`${process.env.REACT_APP_API}/positions/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json(`Id: ${id}`);
      })
      .catch((error) => error);
  };*/

  return (
    <>
      <li>
        <Button action={modalOpen} name={'edit'} />
      </li>
      <li>
        <Button action={modalOpenDel} name={'delete'} />
      </li>
      <Modal visible={modal} psy={props.data} />
      <ModalDel visible={modalDel} psy={props.data} />
    </>
  );
};

export default Options;
