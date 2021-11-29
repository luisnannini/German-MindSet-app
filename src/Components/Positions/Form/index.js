import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import styles from './form.module.css';
import Checkbox from '../Checkbox';

const Form = (props) => {
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    if (positionId) {
      fetch(`${process.env.REACT_APP_API}/positions?_id=${positionId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setClientValue(response.data[0].client);
          setProfilesValue(response.data[0].professionalProfiles);
          setJobDescriptionValue(response.data[0].jobDescription);
          setVacancyValue(response.data[0].vacancy);
          setIsOpenValue(response.data[0].isOpen);
        })
        .catch((error) => {
          error;
        });
    }

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

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangeProfilesValue = (event) => {
    setProfilesValue(event.target.value);
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

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    let url;
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

    if (positionId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/positions/${positionId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/positions`;
    }

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
      })
      .catch((error) => {
        error;
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create a Position</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              object={clients}
              label={'Clients'}
              value={clientValue}
              onChange={onChangeClientValue}
              placeholder={'Select a Client'}
            />
            <Input
              label={'Job Description'}
              value={jobDescriptionValue}
              onChange={onChangeJobDescriptionValue}
              placeholder={'Write a job description'}
            />
            <Checkbox
              label={'Is Open?'}
              type={'checkbox'}
              value={isOpenValue}
              onChange={onChangeIsOpenValue}
            />
          </div>
          <div className={styles.columns}>
            <Select
              object={profiles}
              label={'Profiles'}
              onChange={onChangeProfilesValue}
              placeholder={'Select a Profile'}
            />
            <Input
              label={'Vacancy'}
              value={vacancyValue}
              onChange={onChangeVacancyValue}
              placeholder={'Set the number of vacancies'}
              type={'number'}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button type={'submit'} label={'Confirm'} onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
