import React from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Close from '../Close';

const Modal = () => {
  return (
    <div>
      <div>
        <h3>Title</h3>
        <Close />
      </div>
      <div>
        <Select />
        <Select />
        <Select />
        <Input />
        <Select />
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
};

export default Modal;
