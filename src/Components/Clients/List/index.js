import React from 'react';
import styles from './list.module.css';

const clientsList = (props) => {
  return (
    <ul>
      <li>{props.id}</li>
      <li>{props.name}</li>
      <li>{props.phone}</li>
      <li>{props.country}</li>
      <li>{props.state}</li>
      <li>{props.city}</li>
      <li>{props.address}</li>
      <li>{props.logo}</li>
      <li>{props.description}</li>
      <li>{props.timestamps}</li>
    </ul>
  );
};

export default clientsList;
