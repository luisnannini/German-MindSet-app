import { useEffect, useState } from 'react';
import styles from './form.module.css';
import ModalError from '../Shared/Modal-Error/modal-error';

const Form = () => {
  const [fullNameValue, setFullNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const adminId = params.get('id');
    if (adminId) {
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
      <form onSubmit={submitAdmin}>
        <h2>Form</h2>
        <label>Full Name</label>
        <input
          type="text"
          value={fullNameValue}
          placeholder="Full name"
          onChange={onChangeFullNameValue}
          required
          disabled={isLoading}
        />
        <label>Username</label>
        <input
          type="text"
          value={usernameValue}
          placeholder="Username"
          onChange={onChangeUsernameValue}
          required
          disabled={isLoading}
        />
        <label>Password</label>
        <input
          type="password"
          value={passwordValue}
          placeholder="Password"
          onChange={onChangePasswordValue}
          required
          disabled={isLoading}
        />
        <button disabled={isLoading} type="submit">
          Save
        </button>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />{' '}
      </form>
    </div>
  );
};

export default Form;
