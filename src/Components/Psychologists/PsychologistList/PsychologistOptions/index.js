import { useState } from 'react';
import Modal from './Modal';
import Button from '../../Button';
import ModalOther from './ModalOther';

const Options = (props) => {
  const [error, setError] = useState('');
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
    fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        modalOpenDel();
        return response
          .json(`Id: ${id}`)
          .catch((error) => {
            setError(error.toString());
          })
          .finally(() => {
            window.location.href = `${window.location.origin}/psychologists`;
          });
      })
      .catch((error) => error);
  };

  return (
    <>
      <li>
        <Button action={modalOpen} name={'edit'} data={psy} />
      </li>
      <li>
        <Button action={modalOpenDel} name={'delete'} />
      </li>
      <Modal visible={modal} psy={psy} close={modalOpen} />
      <ModalOther
        visible={modalDel}
        psy={psy}
        action={() => deletePsychologists(id)}
        close={modalOpenDel}
        type={'delete'}
      />
      <div>{error}</div>
    </>
  );
};

export default Options;

//
