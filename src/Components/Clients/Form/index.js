import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

function Form() {
  const [clientId, setClientId] = useState(undefined);
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');
    if (clientId) {
      setClientId(clientId);
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/clients?_id=${clientId}`)
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
              message: 'Client not found',
              title: '404: Not Found'
            });
          }
          setNameValue(response.data[0].name);
          setPhoneValue(response.data[0].phone);
          setCountryValue(response.data[0].location.country);
          setStateValue(response.data[0].location.state);
          setCityValue(response.data[0].location.city);
          setAddressValue(response.data[0].location.address);
          setLogoValue(response.data[0].logo);
          setDescriptionValue(response.data[0].description);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };

  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };

  const onChangeCountryInput = (event) => {
    setCountryValue(event.target.value);
  };

  const onChangeStateInput = (event) => {
    setStateValue(event.target.value);
  };

  const onChangeCityInput = (event) => {
    setCityValue(event.target.value);
  };

  const onChangeAddressInput = (event) => {
    setAddressValue(event.target.value);
  };

  const onChangeLogoInput = (event) => {
    setLogoValue(event.target.value);
  };

  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };

  const submitClients = (event) => {
    event.preventDefault();
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        phone: parseInt(phoneValue, 10),
        location: {
          country: countryValue,
          state: stateValue,
          city: cityValue,
          address: addressValue
        },
        logo: logoValue,
        description: descriptionValue
      })
    };

    if (clientId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/clients/${clientId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/clients`;
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
        window.location.href = '/clients';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitClients}>
        <div className={styles.header}>
          <h2 className={styles.title}>{clientId ? 'Update Client' : 'Create a Client'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Name'}
              name={'name'}
              type={'text'}
              value={nameValue}
              placeholder={'Insert Client name...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeNameInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Address'}
              name={'address'}
              type={'address'}
              value={addressValue}
              placeholder={'Insert Client address...'}
              onChange={onChangeAddressInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Country'}
              name={'country'}
              type={'text'}
              value={countryValue}
              placeholder={'Insert Client country...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeCountryInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Logo'}
              name={'logo'}
              type={'text'}
              value={logoValue}
              placeholder={'Insert Client logo...'}
              onChange={onChangeLogoInput}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Phone Number'}
              name={'phone'}
              type={'number'}
              value={phoneValue}
              placeholder={'Insert Client phone...'}
              pattern={'[0-9]'}
              onChange={onChangePhoneInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'City'}
              name={'city'}
              type={'text'}
              value={cityValue}
              placeholder={'Insert Client city...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeCityInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'State'}
              name={'state'}
              type={'text'}
              value={stateValue}
              placeholder={'Insert Client state...'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeStateInput}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Description'}
              name={'description'}
              type={'text'}
              value={descriptionValue}
              placeholder={'Insert Client description...'}
              onChange={onChangeDescriptionInput}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Link to="/clients">
            <ButtonCancel disabled={isLoading} />
          </Link>
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
      </form>
    </div>
  );
}

export default Form;
