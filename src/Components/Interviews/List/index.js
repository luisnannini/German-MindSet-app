import React from 'react';
import styles from './list.module.css';
import edit from './edit.png';
import remove from './remove.png';

const List = (props) => {
  return (
    <ul className={styles.list}>
      <li>{props.postulant.firstName}</li>
      <li>{props.postulant.lastName}</li>
      <li>{props.client.name}</li>
      {/* <li>{props.application.id}</li> */}
      <li>{props.status}</li>
      <li>{props.date}</li>
      <li>{props.notes}</li>
      <li>
        <img src={edit} />
        <img src={remove} />
      </li>
    </ul>
  );
};

export default List;
