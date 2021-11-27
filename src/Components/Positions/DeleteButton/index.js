import React from 'react';
import remove from './remove.png';

const DeleteButton = ({ onClick }) => {
  return <img onClick={onClick} src={remove}></img>;
};

export default DeleteButton;
