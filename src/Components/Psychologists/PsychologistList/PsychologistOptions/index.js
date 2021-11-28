import { useState } from 'react';
import Modal from './Modal';
import Button from '../../Button';
import ModalOther from './ModalOther';

const Options = (props) => {
  const [modal, changeModal] = useState(false);
  const [modalDel, changeModalDel] = useState(false);
  const psy = props.data;
  const id = psy._id;
  const modalOpenDel = () => {
    changeModalDel(!modalDel);
  };

  const modalOpen = () => {
    changeModal(!modal);
  };

  const deletePsychologists = (id) => {
    console.log(id);
    fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, {
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
        <Button action={() => deletePsychologists(id)} name={'delete'} />
      </li>
      <Modal visible={modal} psy={props.data} />
      <ModalOther visible={modalDel} psy={props.data} type={'delete'} />
    </>
  );
};

export default Options;
