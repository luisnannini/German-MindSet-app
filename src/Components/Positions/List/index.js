import React from 'react';
import styles from './list.module.css';
import UpdateButton from '../UpdateButton';
import DeleteButton from '../DeleteButton';

const List = (props) => {
  return (
    <ul className={styles.list}>
      <li>{props.client}</li>
      <li>{props.profiles}</li>
      <li>{props.jobDescription}</li>
      <li>{props.vacancy}</li>
      <li>{props.isOpen}</li>
      <li>{<UpdateButton />}</li>
      <li>{<DeleteButton onClick={props.onDelete} />}</li>
    </ul>
  );
};

export default List;
