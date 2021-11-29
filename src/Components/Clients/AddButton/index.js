import React from 'react';
import add from './add.png';

const AddButton = ({ onClick }) => {
  return (
    <button>
      <img onClick={onClick} src={add}></img>
    </button>
  );
};

export default AddButton;
