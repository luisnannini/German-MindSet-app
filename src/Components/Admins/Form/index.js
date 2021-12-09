import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import ModalError from '../../Shared/ModalError';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import Input from '../../Shared/Input';

const Form = () => {
  const [fullNameValue, setFullNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState(undefined);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
    setAdminId(adminId);
    if (adminId) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/admins?_id=${adminId}`)
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
              message: 'Admin not found',
              title: '404: Not Found'
            });
          }
          setFullNameValue(response.data[0].name);
          setUsernameValue(response.data[0].username);
          setPasswordValue(response.data[0].password);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onChangeFullNameValue = (event) => {
    setFullNameValue(event.target.value);
  };

  const onChangeUsernameValue = (event) => {
    setUsernameValue(event.target.value);
  };

  const onChangePasswordValue = (event) => {
    setPasswordValue(event.target.value);
  };

  const submitAdmin = (e) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullNameValue,
        username: usernameValue,
        password: passwordValue
      })
    };

    if (adminId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
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
        window.location.href = '/admins';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitAdmin}>
        <div className={styles.header}>
          <h2 className={styles.title}>{adminId ? 'Update Admin' : 'Create Admin'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Full Name'}
              type={'text'}
              value={fullNameValue}
              placeholder={'Full name'}
              onChange={onChangeFullNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Username'}
              type={'text'}
              value={usernameValue}
              placeholder={'Username'}
              onChange={onChangeUsernameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Password'}
              type={'password'}
              value={passwordValue}
              placeholder={'Password'}
              onChange={onChangePasswordValue}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Link to="/admins">
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
