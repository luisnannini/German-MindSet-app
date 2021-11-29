import React from 'react';
import styles from './headerList.module.css';

const HeaderList = (props) => {
  return (
    <ul className={styles.list}>
      <li>{props.client}</li>
      <li>{props.profiles}</li>
      <li>{props.jobDescription}</li>
      <li>{props.vacancy}</li>
      <li>{props.isOpen}</li>
      <li></li>
      <li></li>
    </ul>
  );
};

export default HeaderList;
