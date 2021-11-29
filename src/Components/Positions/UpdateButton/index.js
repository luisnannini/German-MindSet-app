import React from 'react';
import update from './edit.png';

const UpdateButton = (props) => {
  return <img onClick={props.onClick} src={update}></img>;
};

export default UpdateButton;
