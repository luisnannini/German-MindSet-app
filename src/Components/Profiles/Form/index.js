import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import ModalError from '../../Shared/ModalError';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import Input from '../../Shared/Input';

const Form = () => {
  const [profileValue, setProfileValue] = useState('');
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [profileId, setProfileId] = useState(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id');
    setProfileId(profileId);
    if (profileId) {
      fetch(`${process.env.REACT_APP_API}/profiles?_id=${profileId}`)
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
              message: 'Profile not found',
              title: '404: Not Found'
            });
          }
          setProfileValue(response.data[0].name);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        });
    }
  }, []);

  const onChangeProfileValue = (event) => {
    setProfileValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id');
    setProfileId(profileId);
    let url;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileValue
      })
    };

    if (profileId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/profiles/${profileId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/profiles`;
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
          <h2 className={styles.title}>{profileId ? 'Update a Profile' : 'Create a Profile'}</h2>
        </div>
        <Input
          label={'Profile'}
          name={'profile'}
          value={profileValue}
          onChange={onChangeProfileValue}
          placeholder={'Write a new profile'}
          required={true}
          pattern="[A-Za-z ]*"
        />
        <div className={styles.button}>
          <Link to="/profiles">
            <ButtonCancel />
          </Link>
          <ButtonConfirm type={'submit'} />
        </div>
      </form>
    </div>
  );
};

export default Form;
