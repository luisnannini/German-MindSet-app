import { useEffect, useState } from 'react';
import Input from '../Input';
import styles from './form.module.css';
import ModalError from '../../Shared/Modal-Error/modal-error';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');
    if (clientId) {
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
    setLoading(false);
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

  const onSubmit = (event) => {
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
    <section className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Clients Form</h2>
        <label>Name</label>
        <Input
          name="name"
          value={nameValue}
          placeholder="Insert Client name..."
          onChange={onChangeNameInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid name"
          disabled={isLoading}
        />
        <label>Phone Number</label>
        <Input
          name="phone"
          value={phoneValue}
          placeholder="Insert Client phone..."
          onChange={onChangePhoneInput}
          type="number"
          required
          pattern="[0-9]"
          title="Enter a valid phone number"
          disabled={isLoading}
        />
        <label>Country</label>
        <Input
          name="country"
          value={countryValue}
          placeholder="Insert Client country..."
          onChange={onChangeCountryInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid country"
          disabled={isLoading}
        />
        <label>State</label>
        <Input
          name="state"
          value={stateValue}
          placeholder="Insert Client state..."
          onChange={onChangeStateInput}
          type="text"
          pattern="[A-Za-z ]*"
          title="Enter a valid state"
          required
          disabled={isLoading}
        />
        <label>City</label>
        <Input
          name="city"
          value={cityValue}
          placeholder="Insert Client city..."
          onChange={onChangeCityInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid city"
          disabled={isLoading}
        />
        <label>Address</label>
        <Input
          name="address"
          value={addressValue}
          placeholder="Insert Client address..."
          onChange={onChangeAddressInput}
          type="address"
          required
          title="Enter a valid address"
          disabled={isLoading}
        />
        <label>Logo</label>
        <Input
          name="logo"
          value={logoValue}
          placeholder="Insert Client logo..."
          onChange={onChangeLogoInput}
          type="text"
          disabled={isLoading}
        />
        <label>Description</label>
        <Input
          name="description"
          value={descriptionValue}
          placeholder="Insert Client description..."
          onChange={onChangeDescriptionInput}
          type="text"
          disabled={isLoading}
        />
        <button disabled={isLoading} type="submit" className={styles.button}>
          Save
        </button>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />{' '}
      </form>
    </section>
  );
}

export default Form;
