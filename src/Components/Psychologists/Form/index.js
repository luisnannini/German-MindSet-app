import { useState, useEffect } from 'react';
import ModalError from '../../Shared/ModalError';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';
import { useLocation } from 'react-router';

const Form = () => {
  const {
    state: { psychologist }
  } = useLocation();
  const [error, setError] = useState({ show: false });
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [usernameForm, setUsername] = useState('');
  const [passwordForm, setPassword] = useState('');
  const [emailForm, setEmail] = useState('');
  const [phoneForm, setPhone] = useState('');
  const [addressForm, setAddress] = useState('');
  const [mondayBool, setMondayBool] = useState(false);
  const [mondayFrom, setMondayFrom] = useState(0);
  const [mondayTo, setMondayTo] = useState(0);
  const [tuesdayBool, setTuesdayBool] = useState(false);
  const [tuesdayFrom, setTuesdayFrom] = useState(0);
  const [tuesdayTo, setTuesdayTo] = useState(0);
  const [wednesdayBool, setWednesdayBool] = useState(false);
  const [wednesdayFrom, setWednesdayFrom] = useState(0);
  const [wednesdayTo, setWednesdayTo] = useState(0);
  const [thursdayBool, setThursdayBool] = useState(false);
  const [thursdayFrom, setThursdayFrom] = useState(0);
  const [thursdayTo, setThursdayTo] = useState(0);
  const [fridayBool, setFridayBool] = useState(false);
  const [fridayFrom, setFridayFrom] = useState(0);
  const [fridayTo, setFridayTo] = useState(0);
  const [saturdayBool, setSaturdayBool] = useState(false);
  const [saturdayFrom, setSaturdayFrom] = useState(0);
  const [saturdayTo, setSaturdayTo] = useState(0);
  const [sundayBool, setSundayBool] = useState(false);
  const [sundayFrom, setSundayFrom] = useState(0);
  const [sundayTo, setSundayTo] = useState(0);
  const [psychologistId, setPsychologistId] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const psychologistId = params.get('id');
    if (psychologistId) {
      setPsychologistId(psychologistId);
      setFirstName(psychologist.firstName);
      setLastName(psychologist.lastName);
      setUsername(psychologist.username);
      setEmail(psychologist.email);
      setPhone(psychologist.phone);
      setPassword(psychologist.password);
      setAddress(psychologist.address);
      setMondayBool(psychologist.availability.monday.availability);
      setTuesdayBool(psychologist.availability.tuesday.availability);
      setWednesdayBool(psychologist.availability.wednesday.availability);
      setThursdayBool(psychologist.availability.thursday.availability);
      setFridayBool(psychologist.availability.friday.availability);
      setSaturdayBool(psychologist.availability.saturday.availability);
      setSundayBool(psychologist.availability.sunday.availability);
      setMondayFrom(psychologist.availability.monday.from);
      setTuesdayFrom(psychologist.availability.tuesday.from);
      setWednesdayFrom(psychologist.availability.wednesday.from);
      setThursdayFrom(psychologist.availability.thursday.from);
      setFridayFrom(psychologist.availability.friday.from);
      setSaturdayFrom(psychologist.availability.saturday.from);
      setSundayFrom(psychologist.availability.sunday.from);
      setMondayTo(psychologist.availability.monday.to);
      setTuesdayTo(psychologist.availability.tuesday.to);
      setWednesdayTo(psychologist.availability.wednesday.to);
      setThursdayTo(psychologist.availability.thursday.to);
      setFridayTo(psychologist.availability.friday.to);
      setSaturdayTo(psychologist.availability.saturday.to);
      setSundayTo(psychologist.availability.sunday.to);
    }
  }, []);

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

  const onSubmit = (event) => {
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
      <form className={styles.form} onSubmit={onSubmit}>
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
              placeholder={'First Name'}
              onChange={onChangeFirstNameValue}
              type={'text'}
              required={true}
              pattern={'[A-Za-z ]*'}
              value={firstNameForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid First Name</span> */}
            <Input
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Last Name'}
              onChange={onChangeLastNameValue}
              type={'text'}
              required={true}
              pattern={'[A-Za-z ]*'}
              value={lastNameForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid Last Name</span> */}
            <Input
              label={'Username'}
              name={'username'}
              placeholder={'Username'}
              onChange={onChangeUsernameValue}
              type={'text'}
              required={true}
              pattern={'[A-Za-z ]*'}
              value={usernameForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid Username</span> */}
            <Input
              label={'Password'}
              name={'password'}
              onChange={onChangePasswordValue}
              type="password"
              required={true}
              value={passwordForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid Password</span> */}
            <Input
              label={'Email'}
              placeholder={'Email'}
              onChange={onChangeEmailValue}
              type={'email'}
              required={true}
              pattern={'^[^@]+@[^@]+.[a-zA-Z]{2,}$'}
              value={emailForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid E-Mail</span> */}
            <Input
              label={'Phone'}
              name={'phone'}
              placeholder={'Phone'}
              onChange={onChangePhoneValue}
              type={'number'}
              required={true}
              value={phoneForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid Phone Number</span> */}
            <Input
              label={'Address'}
              name={'address'}
              onChange={onChangeAddressValue}
              placeholder={'Address'}
              type={'text'}
              required={true}
              value={addressForm}
              disabled={isLoading}
            />
            {/* <span className={styles.hiddenError}>Invalid Address</span> */}
          </div>
          <div className={styles.columns}>
            <Checkbox
              label="Monday Availability"
              value={mondayBool}
              onChange={onChangeMondayBool}
              day="monday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'monday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeMondayFrom}
                value={mondayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'monday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeMondayTo}
                value={mondayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Tuesday availability"
              value={tuesdayBool}
              onChange={onChangeTuesdayBool}
              day="tuesday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'tuesday-to'}
                placeholder={'To'}
                type={'string'}
                onChange={onChangeTuesdayFrom}
                value={tuesdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'tuesday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeTuesdayTo}
                value={tuesdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Wednesday Availability"
              value={wednesdayBool}
              onChange={onChangeWednesdayBool}
              day="wednesday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'wednesday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeWednesdayFrom}
                value={wednesdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'to'}
                name={'wednesday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeWednesdayTo}
                value={wednesdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Thursday Availability"
              value={thursdayBool}
              onChange={onChangeThursdayBool}
              day="thursday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'thursday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeThursdayFrom}
                value={thursdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'thursday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeThursdayTo}
                value={thursdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Friday Availability"
              value={fridayBool}
              onChange={onChangeFridayBool}
              day="friday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'friday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeFridayFrom}
                value={fridayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'friday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeFridayTo}
                value={fridayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Saturday Availability"
              value={saturdayBool}
              onChange={onChangeSaturdayBool}
              day="saturday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'saturday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeSaturdayFrom}
                value={saturdayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'saturday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeSaturdayTo}
                value={saturdayTo}
                disabled={isLoading}
              />
            </div>
            <Checkbox
              label="Sunday Availability"
              value={sundayBool}
              onChange={onChangeSundayBool}
              day="sunday"
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'sunday-from'}
                placeholder={'From'}
                type={'text'}
                onChange={onChangeSundayFrom}
                value={sundayFrom}
                disabled={isLoading}
              />
              <Input
                label={'To'}
                name={'sunday-to'}
                placeholder={'To'}
                type={'text'}
                onChange={onChangeSundayTo}
                value={sundayTo}
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
