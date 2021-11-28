import React from 'react';
import styles from './list.module.css';
import EditButton from '../EditButton';
import RemoveButton from '../RemoveButton';

const List = (props) => {
  return (
    <ul className={styles.list}>
      <li>{props.name}</li>
      <li>{props.phone}</li>
      <li>{props.country}</li>
      <li>{props.state}</li>
      <li>{props.city}</li>
      <li>{props.address}</li>
      <li>{props.logo}</li>
      <li>{props.description}</li>
      <li>{<EditButton />}</li>
      <li>{<RemoveButton onClick={props.onRemove} />}</li>
    </ul>
  );
};

export default List;
