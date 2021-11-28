import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Close from '../Close';
import styles from './form.module.css';
import CheckboxList from '../CheckboxList';

const Form = ({ onClose }) => {
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.data);
      });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Title</h2>
          <Close onClick={onClose} />
        </div>
        <div className={styles.fields}>
          <Select object={clients} label={'Clients'} />
          <Input label={'Job Description'} />
          <Input label={'Vacancy'} />
          <CheckboxList object={profiles} label={'Profiles'} />
        </div>
        <div className={styles.button}>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Form;
