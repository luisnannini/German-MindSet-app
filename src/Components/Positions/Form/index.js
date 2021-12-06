import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Checkbox from '../Checkbox';
import ModalError from '../../Shared/Modal-Error/modal-error';

const Form = () => {
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [positionId, setPositionId] = useState(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    setPositionId(positionId);
    if (positionId) {
      fetch(`${process.env.REACT_APP_API}/positions?_id=${positionId}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
            const status = `${response.status} ${response.statusText}`;
            return response.json().then(({ message }) => {
              if (message.message) throw { message: message.message, status };
              throw { message, status };
            });
          }
          return response.json();
        })
        .then((response) => {
          setClientValue(response.data[0].client._id);
          setProfilesValue(response.data[0].professionalProfiles._id);
          setJobDescriptionValue(response.data[0].jobDescription);
          setVacancyValue(response.data[0].vacancy);
          setIsOpenValue(response.data[0].isOpen);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        });
    }

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });

    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
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
    setPositionId(positionId);
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
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then(() => {})
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });
  };

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2 className={styles.title}>{positionId ? 'Update a Position' : 'Create a Position'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              object={clients}
              label={'Clients'}
              value={clientValue}
              onChange={onChangeClientValue}
              placeholder={'Select a Client'}
              required
            />
            <Input
              label={'Job Description'}
              value={jobDescriptionValue}
              onChange={onChangeJobDescriptionValue}
              placeholder={'Write a job description'}
              required
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
              value={profilesValue}
              onChange={onChangeProfilesValue}
              placeholder={'Select a Profile'}
              required
            />
            <Input
              className={styles.input}
              label={'Vacancy'}
              value={vacancyValue}
              onChange={onChangeVacancyValue}
              placeholder={'Set the number of vacancies'}
              required
              type={'number'}
              min={1}
              step={1}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button type={'submit'} label={'Confirm'} />
        </div>
      </form>
    </div>
  );
};

export default Form;
