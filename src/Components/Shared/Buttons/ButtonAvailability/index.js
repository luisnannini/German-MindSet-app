import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import styles from './buttonAvailability.module.css';

const ButtonAvailability = (props) => {
  return (
    <button className={styles.button}>
      <FaCalendar onClick={props.onClick} disabled={props.disabled} />
    </button>
  );
};

export default ButtonAvailability;
