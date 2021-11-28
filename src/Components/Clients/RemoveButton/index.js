import React from 'react';
import remove from './remove.png';

const RemoveButton = (props) => {
  return <img onClick={props.onClick} src={remove}></img>;
};

export default RemoveButton;
