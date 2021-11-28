import React, { useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';

const Form = (props) => {
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        phone: phoneValue,
        country: countryValue,
        state: stateValue,
        city: cityValue,
        address: addressValue,
        logo: logoValue,
        description: descriptionValue
      })
    };

    const url = `${process.env.REACT_APP_API}/clients`;

    fetch(url, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>Clients Form</h2>
      <div className={styles.formContainer}>
        <label>Name</label>
        <Input
          name="name"
          value={nameValue}
          placeholder="Client name"
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid name"
        />
        <label>Phone Number</label>
        <Input
          name="phone"
          value={phoneValue}
          placeholder="Client phone"
          onChange={(e) => {
            setPhoneValue(e.target.value);
          }}
          type="phone"
          required
          pattern="^[0-9,$]"
          title="Enter a valid phone number"
        />
        <label>Country</label>
        <Input
          name="country"
          value={countryValue}
          placeholder="Client country"
          onChange={(e) => {
            setCountryValue(e.target.value);
          }}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid country"
        />
        <label>State</label>
        <Input
          name="state"
          value={stateValue}
          placeholder="Client state"
          onChange={(e) => {
            setStateValue(e.target.value);
          }}
          type="text"
          pattern="[A-Za-z ]*"
          title="Enter a valid state"
          required
        />
        <label>City</label>
        <Input
          name="city"
          value={cityValue}
          placeholder="Client city"
          onChange={(e) => {
            setCityValue(e.target.value);
          }}
          type="text"
          required
          pattern="[A-Za-z ]*"
          title="Enter a valid city"
        />
        <label>Address</label>
        <Input
          name="address"
          value={addressValue}
          placeholder="Client address"
          onChange={(e) => {
            setAddressValue(e.target.value);
          }}
          type="address"
          required
          pattern="^[0-9,$], [A-Za-z ]"
          title="Enter a valid address"
        />
        <label>Logo</label>
        <Input
          name="logo"
          value={logoValue}
          placeholder="Client logo"
          onChange={(e) => {
            setLogoValue(e.target.value);
          }}
          type="text"
        />
        <label>Description</label>
        <Input
          name="description"
          value={descriptionValue}
          placeholder="Client description"
          onChange={(e) => {
            setDescriptionValue(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={styles.btn}>
        <button type="submit" className={styles.submit}>
          SAVE
        </button>
      </div>
    </form>
  );
};

export default Form;
