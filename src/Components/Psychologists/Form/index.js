import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';

const Form = () => {
  const [psychologistId, setPsychologistId] = useState(0);
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [usernameForm, setUsername] = useState('');
  const [passwordForm, setPassword] = useState('');
  const [emailForm, setEmail] = useState('');
  const [phoneForm, setPhone] = useState('');
  const [addressForm, setAddress] = useState('');
  const [mondayBool, setMondayBool] = useState(false);
  const [tuesdayBool, setTuesdayBool] = useState(false);
  const [wednesdayBool, setWednesdayBool] = useState(false);
  const [thursdayBool, setThursdayBool] = useState(false);
  const [fridayBool, setFridayBool] = useState(false);
  const [saturdayBool, setSaturdayBool] = useState(false);
  const [sundayBool, setSundayBool] = useState(false);
  const [mondayFrom, setMondayFrom] = useState(0);
  const [tuesdayFrom, setTuesdayFrom] = useState(0);
  const [wednesdayFrom, setWednesdayFrom] = useState(0);
  const [thursdayFrom, setThursdayFrom] = useState(0);
  const [fridayFrom, setFridayFrom] = useState(0);
  const [saturdayFrom, setSaturdayFrom] = useState(0);
  const [sundayFrom, setSundayFrom] = useState(0);
  const [mondayTo, setMondayTo] = useState(0);
  const [tuesdayTo, setTuesdayTo] = useState(0);
  const [wednesdayTo, setWednesdayTo] = useState(0);
  const [thursdayTo, setThursdayTo] = useState(0);
  const [fridayTo, setFridayTo] = useState(0);
  const [saturdayTo, setSaturdayTo] = useState(0);
  const [sundayTo, setSundayTo] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const psychologistId = params.get('id');
    if (psychologistId) {
      setPsychologistId(psychologistId);
      setLoading(true);
      fetch(`${process.env.REACT_APP_API}/psychologists?_id=${psychologistId}`)
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
              message: 'Psychologist not found',
              title: '404: Not Found'
            });
          }
          setFirstName(response.data[0].firstName);
          setLastName(response.data[0].lastName);
          setUsername(response.data[0].username);
          setEmail(response.data[0].email);
          setPhone(response.data[0].phone);
          setPassword(response.data[0].password);
          setAddress(response.data[0].address);
          setMondayBool(response.data[0].availability.monday.availability);
          setTuesdayBool(response.data[0].availability.tuesday.availability);
          setWednesdayBool(response.data[0].availability.wednesday.availability);
          setThursdayBool(response.data[0].availability.thursday.availability);
          setFridayBool(response.data[0].availability.friday.availability);
          setSaturdayBool(response.data[0].availability.saturday.availability);
          setSundayBool(response.data[0].availability.sunday.availability);
          setMondayFrom(response.data[0].availability.monday.from);
          setTuesdayFrom(response.data[0].availability.tuesday.from);
          setWednesdayFrom(response.data[0].availability.wednesday.from);
          setThursdayFrom(response.data[0].availability.thursday.from);
          setFridayFrom(response.data[0].availability.friday.from);
          setSaturdayFrom(response.data[0].availability.saturday.from);
          setSundayFrom(response.data[0].availability.sunday.from);
          setMondayTo(response.data[0].availability.monday.to);
          setTuesdayTo(response.data[0].availability.tuesday.to);
          setWednesdayTo(response.data[0].availability.wednesday.to);
          setThursdayTo(response.data[0].availability.thursday.to);
          setFridayTo(response.data[0].availability.friday.to);
          setSaturdayTo(response.data[0].availability.saturday.to);
          setSundayTo(response.data[0].availability.sunday.to);
        })
        .catch((error) => {
          setError({ show: true, message: error.message, title: error.status });
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onChangeFirstNameValue = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastNameValue = (event) => {
    setLastName(event.target.value);
  };
  const onChangeUsernameValue = (event) => {
    setUsername(event.target.value);
  };
  const onChangePasswordValue = (event) => {
    setPassword(event.target.value);
  };
  const onChangeEmailValue = (event) => {
    setEmail(event.target.value);
  };
  const onChangePhoneValue = (event) => {
    setPhone(event.target.value);
  };
  const onChangeAddressValue = (event) => {
    setAddress(event.target.value);
  };

  // Availability

  const onChangeMondayBool = (event) => {
    setMondayBool(event.target.checked);
  };
  const onChangeTuesdayBool = (event) => {
    setTuesdayBool(event.target.checked);
  };
  const onChangeWednesdayBool = (event) => {
    setWednesdayBool(event.target.checked);
  };
  const onChangeThursdayBool = (event) => {
    setThursdayBool(event.target.checked);
  };
  const onChangeFridayBool = (event) => {
    setFridayBool(event.target.checked);
  };
  const onChangeSaturdayBool = (event) => {
    setSaturdayBool(event.target.checked);
  };
  const onChangeSundayBool = (event) => {
    setSundayBool(event.target.checked);
  };

  // Hour From

  const onChangeMondayFrom = (event) => {
    setMondayFrom(event.target.value);
  };
  const onChangeTuesdayFrom = (event) => {
    setTuesdayFrom(event.target.value);
  };
  const onChangeWednesdayFrom = (event) => {
    setWednesdayFrom(event.target.value);
  };
  const onChangeThursdayFrom = (event) => {
    setThursdayFrom(event.target.value);
  };
  const onChangeFridayFrom = (event) => {
    setFridayFrom(event.target.value);
  };
  const onChangeSaturdayFrom = (event) => {
    setSaturdayFrom(event.target.value);
  };
  const onChangeSundayFrom = (event) => {
    setSundayFrom(event.target.value);
  };

  // Hour To

  const onChangeMondayTo = (event) => {
    setMondayTo(event.target.value);
  };
  const onChangeTuesdayTo = (event) => {
    setTuesdayTo(event.target.value);
  };
  const onChangeWednesdayTo = (event) => {
    setWednesdayTo(event.target.value);
  };
  const onChangeThursdayTo = (event) => {
    setThursdayTo(event.target.value);
  };
  const onChangeFridayTo = (event) => {
    setFridayTo(event.target.value);
  };
  const onChangeSaturdayTo = (event) => {
    setSaturdayTo(event.target.value);
  };
  const onChangeSundayTo = (event) => {
    setSundayTo(event.target.value);
  };

  const submitPsychologist = (event) => {
    event.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const psychologistId = params.get('id');
    let url;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameForm,
        lastName: lastNameForm,
        username: usernameForm,
        password: passwordForm,
        email: emailForm,
        phone: parseInt(phoneForm),
        address: addressForm,
        availability: {
          monday: {
            availability: !!mondayBool,
            from: parseInt(mondayFrom, 10),
            to: parseInt(mondayTo, 10)
          },
          tuesday: {
            availability: !!tuesdayBool,
            from: parseInt(tuesdayFrom, 10),
            to: parseInt(tuesdayTo, 10)
          },
          wednesday: {
            availability: !!wednesdayBool,
            from: parseInt(wednesdayFrom, 10),
            to: parseInt(wednesdayTo, 10)
          },
          thursday: {
            availability: !!thursdayBool,
            from: parseInt(thursdayFrom, 10),
            to: parseInt(thursdayTo, 10)
          },
          friday: {
            availability: !!fridayBool,
            from: parseInt(fridayFrom, 10),
            to: parseInt(fridayTo, 10)
          },
          saturday: {
            availability: !!saturdayBool,
            from: parseInt(saturdayFrom, 10),
            to: parseInt(saturdayTo, 10)
          },
          sunday: {
            availability: !!sundayBool,
            from: parseInt(sundayFrom, 10),
            to: parseInt(sundayTo, 10)
          }
        }
      })
    };

    if (psychologistId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/psychologists/${psychologistId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/psychologists`;
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
        window.location.href = '/psychologists';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitPsychologist}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {psychologistId ? 'Update Psychologist' : 'Create a Psychologist'}
          </h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'First Name'}
              name={'firstName'}
              type={'text'}
              value={firstNameForm}
              placeholder={'First Name'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeFirstNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Last Name'}
              name={'lastName'}
              type={'text'}
              value={lastNameForm}
              placeholder={'Last Name'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeLastNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Username'}
              name={'username'}
              type={'text'}
              value={usernameForm}
              placeholder={'Username'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeUsernameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Password'}
              name={'password'}
              type="password"
              value={passwordForm}
              onChange={onChangePasswordValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Email'}
              type={'email'}
              value={emailForm}
              placeholder={'Email'}
              pattern={'^[^@]+@[^@]+.[a-zA-Z]{2,}$'}
              onChange={onChangeEmailValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Phone'}
              name={'phone'}
              type={'number'}
              value={phoneForm}
              placeholder={'Phone'}
              onChange={onChangePhoneValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Address'}
              name={'address'}
              type={'text'}
              value={addressForm}
              placeholder={'Address'}
              onChange={onChangeAddressValue}
              required={true}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Checkbox
              label="Monday Availability"
              value={mondayBool}
              day="monday"
              onChange={onChangeMondayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'monday-from'}
                type={'text'}
                value={mondayFrom}
                placeholder={'From'}
                onChange={onChangeMondayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'monday-to'}
                type={'text'}
                value={mondayTo}
                placeholder={'To'}
                onChange={onChangeMondayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Tuesday availability"
              value={tuesdayBool}
              day="tuesday"
              onChange={onChangeTuesdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'tuesday-to'}
                type={'string'}
                placeholder={'To'}
                value={tuesdayFrom}
                onChange={onChangeTuesdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'tuesday-to'}
                type={'text'}
                placeholder={'To'}
                value={tuesdayTo}
                onChange={onChangeTuesdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Wednesday Availability"
              value={wednesdayBool}
              day="wednesday"
              onChange={onChangeWednesdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'wednesday-from'}
                type={'text'}
                value={wednesdayFrom}
                placeholder={'From'}
                onChange={onChangeWednesdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'to'}
                name={'wednesday-to'}
                type={'text'}
                value={wednesdayTo}
                placeholder={'To'}
                onChange={onChangeWednesdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Thursday Availability"
              value={thursdayBool}
              day="thursday"
              onChange={onChangeThursdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'thursday-from'}
                type={'text'}
                value={thursdayFrom}
                placeholder={'From'}
                onChange={onChangeThursdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'thursday-to'}
                type={'text'}
                value={thursdayTo}
                placeholder={'To'}
                onChange={onChangeThursdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Friday Availability"
              value={fridayBool}
              day="friday"
              onChange={onChangeFridayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'friday-from'}
                type={'text'}
                value={fridayFrom}
                placeholder={'From'}
                onChange={onChangeFridayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'friday-to'}
                type={'text'}
                value={fridayTo}
                placeholder={'To'}
                onChange={onChangeFridayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Saturday Availability"
              value={saturdayBool}
              day="saturday"
              onChange={onChangeSaturdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'saturday-from'}
                type={'text'}
                value={saturdayFrom}
                placeholder={'From'}
                onChange={onChangeSaturdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'saturday-to'}
                type={'text'}
                value={saturdayTo}
                placeholder={'To'}
                onChange={onChangeSaturdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Sunday Availability"
              value={sundayBool}
              day="sunday"
              onChange={onChangeSundayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'sunday-from'}
                type={'text'}
                value={sundayFrom}
                placeholder={'From'}
                onChange={onChangeSundayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'sunday-to'}
                type={'text'}
                value={sundayTo}
                placeholder={'To'}
                onChange={onChangeSundayTo}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <Link to="/psychologists">
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
