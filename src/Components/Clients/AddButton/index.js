import React from 'react';
import add from './add.png';

const AddButton = ({ onClick }) => {
  return (
    <a href="/clients/form">
      <img onClick={onClick} src={add}></img>
    </a>
  );
};

export default AddButton;
