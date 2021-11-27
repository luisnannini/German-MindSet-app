import React from 'react';
import styles from './list.module.css';

const List = (props) => {
  return (
    <ul className={styles.list}>
      <li>{props.client}</li>
      <li>{props.profiles}</li>
      <li>{props.jobDescription}</li>
      <li>{props.vacancy}</li>
      <li>{props.isOpen}</li>
      <li>{props.update}</li>
      <li>{props.delete}</li>
    </ul>
  );
};

export default List;
