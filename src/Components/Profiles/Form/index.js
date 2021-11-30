import { React, useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

const Form = () => {
  const [profileValue, setProfileValue] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id');
    if (profileId) {
      fetch(`${process.env.REACT_APP_API}/profiles?_id=${profileId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setProfileValue(response.data[0].name);
        })
        .catch((error) => {
          setShowErrorModal(true);
          setError(error.toString());
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
        window.location.href = '/profiles';
      })
      .catch((error) => {
        setShowErrorModal(true);
        setError(error.toString());
      });
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className={styles.container}>
      <Modal show={showErrorModal} title="Error" message={error} onCancel={closeModal} />
      <Modal show={showSuccessModal} title="Successful" message={success} onCancel={closeModal} />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create a Profile</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Profile'}
              value={profileValue}
              onChange={onChangeProfileValue}
              placeholder={'Write a new profile'}
              required
              pattern="[A-Za-z ]*"
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
