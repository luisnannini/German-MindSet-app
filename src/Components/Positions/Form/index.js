import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Close from '../Close';
import styles from './form.module.css';
import CheckboxList from '../CheckboxList';
import Checkbox from '../Checkbox';

const Form = (props) => {
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
          <h2>Create a Position</h2>
          <Close onClick={props.closeForm} />
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select object={clients} label={'Clients'} />
            <Input label={'Job Description'} />
            <Input label={'Vacancy'} />
            <Checkbox label={'Is Open?'} type={'checkbox'} />
          </div>
          <div className={styles.columns}>
            <CheckboxList object={profiles} label={'Profiles'} />
          </div>
        </div>
        <div className={styles.button}>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Form;
