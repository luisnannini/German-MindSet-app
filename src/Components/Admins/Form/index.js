import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import Input from '../../Shared/Input';

const Form = () => {
  const [fullNameValue, setFullNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
    if (adminId) {
      fetch(`${process.env.REACT_APP_API}/admins?_id=${adminId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setFullNameValue(response.data[0].name);
          setUsernameValue(response.data[0].username);
          setPasswordValue(response.data[0].password);
        })
        .catch((error) => {
          setError(error.toString());
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
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/admins';
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitAdmin}>
        <h2>Form</h2>
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
        <Link to="/admins">
          <ButtonCancel />
        </Link>
        <ButtonConfirm disabled={isLoading} type="submit" />
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
};

export default Form;
