import React from 'react';
import create from './create.png';

const CreateButton = (props) => {
  return <img onClick={props.onClick} src={create}></img>;
};

export default CreateButton;
