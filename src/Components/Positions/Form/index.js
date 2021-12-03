import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Checkbox from '../Checkbox';

const Form = () => {
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [positionId, setPositionId] = useState(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const positionId = params.get('id');
    setPositionId(positionId);
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
          setClientValue(response.data[0].client._id);
          setProfilesValue(response.data[0].professionalProfiles._id);
          setJobDescriptionValue(response.data[0].jobDescription);
          setVacancyValue(response.data[0].vacancy);
          setIsOpenValue(response.data[0].isOpen);
        })
        .catch((error) => {
          setShowErrorModal(true);
          setError(error.toString());
        });
    }

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });

    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
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
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        setShowSuccessModal(true);
        setSuccess('You request was successful!');
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeSuccessModal = () => {
    window.location.href = '/positions';
  };

  return (
    <div className={styles.container}>
      <Modal
        show={showSuccessModal}
        title="Successful"
        message={success}
        onCancel={closeSuccessModal}
        hideButton={true}
      />
      <Modal
        show={showErrorModal}
        title="Error"
        message={error}
        onCancel={closeErrorModal}
        hideButton={true}
      />
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
