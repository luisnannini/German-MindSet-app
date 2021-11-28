import { useState } from 'react';
import Modal from './Modal';
import Button from '../../Button';

const Options = (props) => {
  const [modal, changeModal] = useState(false);

  const modalOpen = () => {
    changeModal(!modal);
  };

  //const editRoute = () => {

  return (
    <>
      <li>
        <a href={`psychologists/form/${props.data._id}`} name={'edit'}>
          test
        </a>
      </li>
      <li>
        <Button action={modalOpen} name={'delete'} />
      </li>
      <Modal visible={modal} psy={props.data} />
    </>
  );
};

export default Options;
