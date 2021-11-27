import React from 'react';
import create from './create.png';

const CreateButton = ({ onClick }) => {
  return <img onClick={onClick} src={create}></img>;
};

export default CreateButton;
