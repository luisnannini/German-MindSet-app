import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import ModalError from '../../Shared/ModalError';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import Select from '../../Shared/Select';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import { useLocation } from 'react-router';

const Form = () => {
  const {
    state: { position }
  } = useLocation();
  console.log(position);
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [positionId, setPositionId] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    if (positionId) {
      setPositionId(positionId);
      setClientValue(position.client._id);
      setProfilesValue(position.professionalProfiles._id);
      setJobDescriptionValue(position.jobDescription);
      setVacancyValue(position.vacancy);
      setIsOpenValue(position.isOpen);
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
      })
      .finally(() => setLoading(false));
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
    setLoading(true);
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
      .then(() => {
        window.location.href = '/positions';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
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
              title={'Select a Client'}
              required
              disabled={isLoading}
            />
            <Input
              label={'Job Description'}
              value={jobDescriptionValue}
              name={'job-description'}
              onChange={onChangeJobDescriptionValue}
              placeholder={'Write a job description'}
              required={true}
              disabled={isLoading}
            />
            <Checkbox label={'Is Open?'} value={isOpenValue} onChange={onChangeIsOpenValue} />
          </div>
          <div className={styles.columns}>
            <Select
              object={profiles}
              label={'Profiles'}
              value={profilesValue}
              onChange={onChangeProfilesValue}
              title={'Select a Profile'}
              required
              disabled={isLoading}
            />
            <Input
              label={'Vacancy'}
              value={vacancyValue}
              name={'vacancy'}
              onChange={onChangeVacancyValue}
              placeholder={'Set the number of vacancies'}
              required={true}
              type={'number'}
              min={1}
              step={1}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Link to="/positions">
            <ButtonCancel disabled={isLoading} />
          </Link>
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
