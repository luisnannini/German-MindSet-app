import React from 'react';
import styles from './list.module.css';
import EditButton from '../EditButton';
import RemoveButton from '../RemoveButton';

const List = (props) => {
  const openModal = () => {
    console.log('open');
  };

  return (
    <ul className={styles.list}>
      <li>{props.postulant.firstName}</li>
      <li>{props.postulant.lastName}</li>
      <li>{props.client.name}</li>
      {/* <li>{props.application.id}</li> */}
      <li>{props.status}</li>
      <li>{props.date}</li>
      <li>{props.notes}</li>
      <li className={styles.buttons}>
        <EditButton />
        <RemoveButton />
      </li>
    </ul>
  );
};

export default List;
