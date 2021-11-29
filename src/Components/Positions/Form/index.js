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
  const [clientValue, setClientValue] = useState('');
  let [profilesValue, setProfilesValue] = useState([]);
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);

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

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangeProfilesValue = (event) => {
    const profile = event.target.value;
    if (event.target.checked) {
      if (!profilesValue.includes(profile)) profilesValue.push(profile);
    }
    if (!event.target.checked) {
      profilesValue = profilesValue.filter((fil) => fil !== profile);
    }
    setProfilesValue(profilesValue);
  };

  const onChangeJobDescriptionValue = (event) => {
    setJobDescriptionValue(event.target.value);
  };

  const onChangeVacancyValue = (event) => {
    setVacancyValue(event.target.value);
  };

  const onChangeIsOpenValue = (event) => {
    setIsOpenValue(event.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client: clientValue,
        jobDescription: jobDescriptionValue,
        vacancy: vacancyValue,
        professionalProfiles: profilesValue,
        isOpen: isOpenValue
      })
    };
    const url = `${process.env.REACT_APP_API}/positions/`;

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/positions';
      });
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2>Create a Position</h2>
          <Close onClick={props.onCancel} />
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select object={clients} label={'Clients'} onChange={onChangeClientValue} />
            <Input label={'Job Description'} onChange={onChangeJobDescriptionValue} />
            <Input label={'Vacancy'} onChange={onChangeVacancyValue} />
            <Checkbox label={'Is Open?'} type={'checkbox'} onChange={onChangeIsOpenValue} />
          </div>
          <div className={styles.columns}>
            <CheckboxList object={profiles} label={'Profiles'} onChange={onChangeProfilesValue} />
          </div>
        </div>
        <div className={styles.button}>
          <Button type={'submit'} label={'Create'} />
        </div>
      </form>
    </div>
  );
};

export default Form;
