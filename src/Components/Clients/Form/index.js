import { useEffect, useState } from 'react';
import Input from '../Input';
import styles from './form.module.css';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('id');
    if (clientId) {
      fetch(`${process.env.REACT_APP_API}/clients?_id=${clientId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
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
          setError(error.toString());
        });
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
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/clients';
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Clients Form</h2>
        <Input
          name="name"
          value={nameValue}
          placeholder="Client name"
          onChange={onChangeNameInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid name"
          disable={isLoading}
        />
        <Input
          name="phone"
          value={phoneValue}
          placeholder="Client phone"
          onChange={onChangePhoneInput}
          type="number"
          required
          pattern="[0-9]"
          title="Enter a valid phone number"
          disable={isLoading}
        />
        <Input
          name="country"
          value={countryValue}
          placeholder="Client country"
          onChange={onChangeCountryInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid country"
          disable={isLoading}
        />
        <Input
          name="state"
          value={stateValue}
          placeholder="Client state"
          onChange={onChangeStateInput}
          type="text"
          pattern="[A-Za-z ]*"
          title="Enter a valid state"
          required
          disable={isLoading}
        />
        <Input
          name="city"
          value={cityValue}
          placeholder="Client city"
          onChange={onChangeCityInput}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid city"
          disable={isLoading}
        />
        <Input
          name="address"
          value={addressValue}
          placeholder="Client address"
          onChange={onChangeAddressInput}
          type="address"
          required
          title="Enter a valid address"
          disable={isLoading}
        />
        <Input
          name="logo"
          value={logoValue}
          placeholder="Client logo"
          onChange={onChangeLogoInput}
          type="text"
          disable={isLoading}
        />
        <Input
          name="description"
          value={descriptionValue}
          placeholder="Client description"
          onChange={onChangeDescriptionInput}
          type="text"
          disable={isLoading}
        />
        <button disable={isLoading} type="submit" className={styles.button}>
          Save
        </button>
        <div className={styles.error}>{error}</div>
      </form>
    </section>
  );
}

export default Form;
