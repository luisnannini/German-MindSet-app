import React from 'react';
import styles from './list.module.css';

const List = () => {
  return (
    <ul className={styles.list}>
      <li>ID</li>
      <li>Client</li>
      <li>Professional Profile</li>
      <li>jobDescription</li>
      <li>Vacancy</li>
      <li>Is Open</li>
    </ul>
  );
};

export default List;
