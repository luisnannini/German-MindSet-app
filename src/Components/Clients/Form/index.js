import React, { useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [logoValue, setLogoValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

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
    const url = `${process.env.REACT_APP_API}/clients/`;

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
        window.location.href = `${window.location.origin}/clients`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.form}>
      <h2>Clients Form</h2>
      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div className={styles.group}>
          <label>Name</label>
          <input
            name="name"
            value={nameValue}
            placeholder="Client name"
            onChange={onChangeNameInput}
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid name"
          ></input>
        </div>
        <div className={styles.group}>
          <label>Phone Number</label>
          <input
            name="phone"
            value={phoneValue}
            placeholder="Client phone"
            onChange={onChangePhoneInput}
            type="phone"
            required
            title="Enter a valid phone number"
          ></input>
        </div>
        <div className={styles.group}>
          <label>Country</label>
          <input
            name="country"
            value={countryValue}
            placeholder="Client country"
            onChange={onChangeCountryInput}
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid country"
          ></input>
        </div>
        <div className={styles.group}>
          <label>State</label>
          <input
            name="state"
            value={stateValue}
            placeholder="Client state"
            onChange={onChangeStateInput}
            type="text"
            pattern="[A-Za-z ]*"
            title="Enter a valid state"
            required
          ></input>
        </div>
        <div className={styles.group}>
          <label>City</label>
          <input
            name="city"
            value={cityValue}
            placeholder="Client city"
            onChange={onChangeCityInput}
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid city"
          ></input>
        </div>
        <div className={styles.group}>
          <label>Address</label>
          <input
            name="address"
            value={addressValue}
            placeholder="Client address"
            onChange={onChangeAddressInput}
            type="address"
            required
            title="Enter a valid address"
          ></input>
        </div>
        <div className={styles.group}>
          <label>Logo</label>
          <input
            name="logo"
            value={logoValue}
            placeholder="Client logo"
            onChange={onChangeLogoInput}
            type="text"
          ></input>
        </div>
        <div className={styles.group}>
          <label>Description</label>
          <input
            name="description"
            value={descriptionValue}
            placeholder="Client description"
            onChange={onChangeDescriptionInput}
            type="text"
          ></input>
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.submit}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
