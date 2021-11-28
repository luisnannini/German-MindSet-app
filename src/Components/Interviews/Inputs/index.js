import React from 'react';
import styles from './inputs.module.css';

const Inputs = () => {
  return (
    <div className={styles.container}>
      <h3>Postulant</h3>
      <div className={styles.containerDiv}>
        <label>First Name</label>
        <input></input>
        <label>Last Name</label>
        <input></input>
      </div>
      <h3>Client</h3>
      <div className={styles.containerDiv}>
        <label>Name</label>
        <input></input>
        <label>Status</label>
        <input></input>
      </div>
      <div className={styles.containerDiv}>
        <label>Date</label>
        <input></input>
        <label>Notes</label>
        <input></input>
      </div>
    </div>
  );
};

export default Inputs;
