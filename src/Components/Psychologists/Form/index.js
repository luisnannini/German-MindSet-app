import { useState, useEffect } from 'react';
import ModalError from '../../Shared/ModalError';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import ButtonCancel from '../../Shared/ButtonCancel';

const Form = () => {
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const psychologistId = params.get('id');
    if (psychologistId) {
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
        });
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
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Form</h2>
        <div>
          <h2 className={styles.title}>PERSONAL DATA</h2>
          <div className={styles.columns}></div>
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
            />
            <span className={styles.hiddenError}>Invalid First Name</span>
            <Input
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Last Name'}
              onChange={onChangeLastNameValue}
              type={'text'}
              required={true}
              pattern={'[A-Za-z ]*'}
              value={lastNameForm}
            />
            <span className={styles.hiddenError}>Invalid Last Name</span>
            <Input
              label={'Username'}
              name={'username'}
              placeholder={'Username'}
              onChange={onChangeUsernameValue}
              type={'text'}
              required={true}
              pattern={'[A-Za-z ]*'}
              value={usernameForm}
            />
            <span className={styles.hiddenError}>Invalid Username</span>
            <Input
              label={'Password'}
              name={'password'}
              onChange={onChangePasswordValue}
              type="password"
              required={true}
              value={passwordForm}
            />
            <span className={styles.hiddenError}>Invalid Password</span>
            <Input
              label={'Email'}
              placeholder={'Email'}
              onChange={onChangeEmailValue}
              type={'email'}
              required={true}
              pattern={'^[^@]+@[^@]+.[a-zA-Z]{2,}$'}
              value={emailForm}
            />
            <span className={styles.hiddenError}>Invalid E-Mail</span>
            <Input
              label={'Phone'}
              name={'phone'}
              placeholder={'Phone'}
              onChange={onChangePhoneValue}
              type={'number'}
              required={true}
              value={phoneForm}
            />
            <span className={styles.hiddenError}>Invalid Phone Number</span>
            <Input
              label={'Address'}
              name={'address'}
              onChange={onChangeAddressValue}
              placeholder={'Address'}
              type={'text'}
              required={true}
              value={addressForm}
            />
            <span className={styles.hiddenError}>Invalid Address</span>
          </div>
        </div>
        <h2 className={styles.container}>Availability</h2>
        <div>
          <p>Monday</p>
          <Checkbox
            label="monday-availability"
            value={mondayBool}
            onChange={onChangeMondayBool}
            day="monday"
          />
          <Input
            label={'From'}
            name={'monday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeMondayFrom}
            value={mondayFrom}
          />
          <Input
            label={'To'}
            name={'monday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeMondayTo}
            value={mondayTo}
          />
        </div>
        <div>
          <p>Tuesday</p>
          <Checkbox
            label="tuesday-availability"
            value={tuesdayBool}
            onChange={onChangeTuesdayBool}
            day="tuesday"
          />
          <Input
            label={'From'}
            name={'tuesday-to'}
            placeholder={'To'}
            type={'string'}
            onChange={onChangeTuesdayFrom}
            value={tuesdayFrom}
          />
          <Input
            label={'To'}
            name={'tuesday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeTuesdayTo}
            value={tuesdayTo}
          />
        </div>
        <div>
          <p>Wednesday</p>
          <Checkbox
            label="wednesday-availability"
            value={wednesdayBool}
            onChange={onChangeWednesdayBool}
            day="wednesday"
          />
          <Input
            label={'From'}
            name={'wednesday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeWednesdayFrom}
            value={wednesdayFrom}
          />
          <Input
            label={'to'}
            name={'wednesday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeWednesdayTo}
            value={wednesdayTo}
          />
        </div>
        <div>
          <p>Thursday</p>
          <Checkbox
            label="thursday-availability"
            value={thursdayBool}
            onChange={onChangeThursdayBool}
            day="thursday"
          />
          <Input
            label={'From'}
            name={'thursday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeThursdayFrom}
            value={thursdayFrom}
          />
          <Input
            label={'To'}
            name={'thursday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeThursdayTo}
            value={thursdayTo}
          />
        </div>
        <div>
          <p>Friday</p>
          <Checkbox
            label="friday-availability"
            value={fridayBool}
            onChange={onChangeFridayBool}
            day="friday"
          />
          <Input
            label={'From'}
            name={'friday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeFridayFrom}
            value={fridayFrom}
          />
          <Input
            label={'To'}
            name={'friday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeFridayTo}
            value={fridayTo}
          />
        </div>
        <div>
          <p>Saturday</p>
          <Checkbox
            label="saturday-availability"
            value={saturdayBool}
            onChange={onChangeSaturdayBool}
            day="saturday"
          />
          <Input
            label={'From'}
            name={'saturday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeSaturdayFrom}
            value={saturdayFrom}
          />
          <Input
            label={'To'}
            name={'saturday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeSaturdayTo}
            value={saturdayTo}
          />
        </div>
        <div>
          <p>Sunday</p>
          <Checkbox
            label="sunday-availability"
            value={sundayBool}
            onChange={onChangeSundayBool}
            day="sunday"
          />
          <Input
            label={'From'}
            name={'sunday-from'}
            placeholder={'From'}
            type={'text'}
            onChange={onChangeSundayFrom}
            value={sundayFrom}
          />
          <Input
            label={'To'}
            name={'sunday-to'}
            placeholder={'To'}
            type={'text'}
            onChange={onChangeSundayTo}
            value={sundayTo}
          />
        </div>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
        <Link to="/psychologists">
          <ButtonCancel />
        </Link>
        <ButtonConfirm type="submit" />
      </form>
    </div>
  );
};

export default Form;
