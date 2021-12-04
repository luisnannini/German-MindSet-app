import React from 'react';
import exit from './exit.png';

const ExitButton = (props) => {
  return <img onClick={props.onClick} src={exit}></img>;
};

export default ExitButton;
