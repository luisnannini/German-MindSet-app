import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

const Form = () => {
  const [positionId, setPositionId] = useState(undefined);
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

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    if (positionId) {
      setPositionId(positionId);
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
          if (!response.data[0]) {
            return setError({
              show: true,
              message: 'Position not found',
              title: '404: Not Found'
            });
          }
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

  const submitPosition = (event) => {
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
      <form className={styles.form} onSubmit={submitPosition}>
        <div className={styles.header}>
          <h2 className={styles.title}>{positionId ? 'Update a Position' : 'Create a Position'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              label={'Clients'}
              title={'Select a Client'}
              value={clientValue}
              object={clients}
              onChange={onChangeClientValue}
              required
              disabled={isLoading}
            />
            <Input
              label={'Job Description'}
              name={'job-description'}
              value={jobDescriptionValue}
              placeholder={'Write a job description'}
              onChange={onChangeJobDescriptionValue}
              required={true}
              disabled={isLoading}
            />
            <Checkbox
              label={'Is Open?'}
              value={isOpenValue}
              onChange={onChangeIsOpenValue}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Select
              label={'Profiles'}
              title={'Select a Profile'}
              value={profilesValue}
              object={profiles}
              onChange={onChangeProfilesValue}
              required
              disabled={isLoading}
            />
            <Input
              label={'Vacancy'}
              name={'vacancy'}
              type={'number'}
              value={vacancyValue}
              placeholder={'Set the number of vacancies'}
              min={1}
              step={1}
              onChange={onChangeVacancyValue}
              required={true}
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
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
      </form>
    </div>
  );
};

export default Form;
