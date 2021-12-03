import styles from './form.module.css';
import Availability from './Availability';
import { useState } from 'react';
import Button from '../Button';

const index = (props) => {
  let psy = {
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    availability: {
      monday: {
        availability: false,
        from: '',
        to: ''
      },
      tuesday: {
        availability: false,
        from: '',
        to: ''
      },
      wednesday: {
        availability: false,
        from: '',
        to: ''
      },
      thursday: {
        availability: false,
        from: '',
        to: ''
      },
      friday: {
        availability: false,
        from: '',
        to: ''
      },
      saturday: {
        availability: false,
        from: '',
        to: ''
      },
      sunday: {
        availability: false,
        from: '',
        to: ''
      }
    }
  };

  if (props.data) {
    psy = props.data;
  }

  const [error, setError] = useState('');

  const [firstNameForm, setFirstName] = useState(psy.firstName);
  const [lastNameForm, setLastName] = useState(psy.lastName);
  const [usernameForm, setUsername] = useState(psy.username);
  const [passwordForm, setPassword] = useState(psy.password);
  const [emailForm, setEmail] = useState(psy.email);
  const [phoneForm, setPhone] = useState(psy.phone);
  const [addressForm, setAddress] = useState(psy.address);

  const [mondayBool, setMondayBool] = useState(psy.availability.monday.availability);
  const [mondayFrom, setMondayFrom] = useState(psy.availability.monday.from);
  const [mondayTo, setMondayTo] = useState(psy.availability.monday.to);

  const [tuesdayBool, setTuesdayBool] = useState(psy.availability.tuesday.availability);
  const [tuesdayFrom, setTuesdayFrom] = useState(psy.availability.tuesday.from);
  const [tuesdayTo, setTuesdayTo] = useState(psy.availability.tuesday.to);

  const [wednesdayBool, setWednesdayBool] = useState(psy.availability.wednesday.availability);
  const [wednesdayFrom, setWednesdayFrom] = useState(psy.availability.wednesday.from);
  const [wednesdayTo, setWednesdayTo] = useState(psy.availability.wednesday.to);

  const [thursdayBool, setThursdayBool] = useState(psy.availability.thursday.availability);
  const [thursdayFrom, setThursdayFrom] = useState(psy.availability.thursday.from);
  const [thursdayTo, setThursdayTo] = useState(psy.availability.thursday.to);

  const [fridayBool, setFridayBool] = useState(psy.availability.friday.availability);
  const [fridayFrom, setFridayFrom] = useState(psy.availability.friday.from);
  const [fridayTo, setFridayTo] = useState(psy.availability.friday.to);

  const [saturdayBool, setSaturdayBool] = useState(psy.availability.saturday.availability);
  const [saturdayFrom, setSaturdayFrom] = useState(psy.availability.saturday.from);
  const [saturdayTo, setSaturdayTo] = useState(psy.availability.saturday.to);

  const [sundayBool, setSundayBool] = useState(psy.availability.sunday.availability);
  const [sundayFrom, setSundayFrom] = useState(psy.availability.sunday.from);
  const [sundayTo, setSundayTo] = useState(psy.availability.sunday.to);

  var availabilityForm = {
    monday: {
      availability: mondayBool,
      from: mondayFrom,
      to: mondayTo
    },
    tuesday: {
      availability: tuesdayBool,
      from: tuesdayFrom,
      to: tuesdayTo
    },
    wednesday: {
      availability: wednesdayBool,
      from: wednesdayFrom,
      to: wednesdayTo
    },
    thursday: {
      availability: thursdayBool,
      from: thursdayFrom,
      to: thursdayTo
    },
    friday: {
      availability: fridayBool,
      from: fridayFrom,
      to: fridayTo
    },
    saturday: {
      availability: saturdayBool,
      from: saturdayFrom,
      to: saturdayTo
    },
    sunday: {
      availability: sundayBool,
      from: sundayFrom,
      to: sundayTo
    }
  };

  // days available
  const onChangeMondayBool = (param) => {
    setMondayBool(param);
  };
  const onChangeTuesdayBool = (param) => {
    setTuesdayBool(param);
  };
  const onChangeWednesdayBool = (param) => {
    setWednesdayBool(param);
  };
  const onChangeThursdayBool = (param) => {
    setThursdayBool(param);
  };
  const onChangeFridayBool = (param) => {
    setFridayBool(param);
  };
  const onChangeSaturdayBool = (param) => {
    setSaturdayBool(param);
  };
  const onChangeSundayBool = (param) => {
    setSundayBool(param);
  };

  const changeDayAvail = (event) => {
    const param = event.target.name;
    switch (param) {
      case 'monday-availability':
        onChangeMondayBool(event.target.checked);
        break;
      case 'tuesday-availability':
        onChangeTuesdayBool(event.target.checked);
        break;
      case 'wednesday-availability':
        onChangeWednesdayBool(event.target.checked);
        break;
      case 'thursday-availability':
        onChangeThursdayBool(event.target.checked);
        break;
      case 'friday-availability':
        onChangeFridayBool(event.target.checked);
        break;
      case 'saturday-availability':
        onChangeSaturdayBool(event.target.checked);
        break;
      case 'sunday-availability':
        onChangeSundayBool(event.target.checked);
        break;
      default:
        break;
    }
  };
  // hour-from available

  const onChangeMondayFrom = (param) => {
    setMondayFrom(param);
  };
  const onChangeTuesdayFrom = (param) => {
    setTuesdayFrom(param);
  };
  const onChangeWednesdayFrom = (param) => {
    setWednesdayFrom(param);
  };
  const onChangeThursdayFrom = (param) => {
    setThursdayFrom(param);
  };
  const onChangeFridayFrom = (param) => {
    setFridayFrom(param);
  };
  const onChangeSaturdayFrom = (param) => {
    setSaturdayFrom(param);
  };
  const onChangeSundayFrom = (param) => {
    setSundayFrom(param);
  };

  const changeHourAvailFrom = (event) => {
    const param = event.target.name;
    switch (param) {
      case 'monday-from':
        onChangeMondayFrom(event.target.value);
        break;
      case 'tuesday-from':
        onChangeTuesdayFrom(event.target.value);
        break;
      case 'wednesday-from':
        onChangeWednesdayFrom(event.target.value);
        break;
      case 'thursday-from':
        onChangeThursdayFrom(event.target.value);
        break;
      case 'friday-from':
        onChangeFridayFrom(event.target.value);
        break;
      case 'saturday-from':
        onChangeSaturdayFrom(event.target.value);
        break;
      case 'sunday-from':
        onChangeSundayFrom(event.target.value);
        break;
      default:
        break;
    }
  };

  // hour-to available

  const onChangeMondayTo = (param) => {
    setMondayTo(param);
  };
  const onChangeTuesdayTo = (param) => {
    setTuesdayTo(param);
  };
  const onChangeWednesdayTo = (param) => {
    setWednesdayTo(param);
  };
  const onChangeThursdayTo = (param) => {
    setThursdayTo(param);
  };
  const onChangeFridayTo = (param) => {
    setFridayTo(param);
  };
  const onChangeSaturdayTo = (param) => {
    setSaturdayTo(param);
  };
  const onChangeSundayTo = (param) => {
    setSundayTo(param);
  };

  const changeHourAvailTo = (event) => {
    const param = event.target.name;
    switch (param) {
      case 'monday-to':
        onChangeMondayTo(event.target.value);
        break;
      case 'tuesday-to':
        onChangeTuesdayTo(event.target.value);
        break;
      case 'wednesday-to':
        onChangeWednesdayTo(event.target.value);
        break;
      case 'thursday-to':
        onChangeThursdayTo(event.target.value);
        break;
      case 'friday-to':
        onChangeFridayTo(event.target.value);
        break;
      case 'saturday-to':
        onChangeSaturdayTo(event.target.value);
        break;
      case 'sunday-to':
        onChangeSundayTo(event.target.value);
        break;
      default:
        break;
    }
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

  const onSubmit = (e) => {
    e.preventDefault();
    let methodType = 'POST';
    let route = `${process.env.REACT_APP_API}/psychologists/`;
    let jsonData = {
      firstName: firstNameForm,
      lastName: lastNameForm,
      username: usernameForm,
      password: passwordForm,
      email: emailForm,
      phone: parseInt(phoneForm),
      address: addressForm,
      availability: availabilityForm
    };
    if (props.data) {
      methodType = 'PUT';
      route = `${process.env.REACT_APP_API}/psychologists/${props.data._id}`;
    }
    let options = {
      method: methodType,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };
    fetch(route, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response
        .json()
        .catch((err) => {
          setError(error.toString());
        })
        .finally(() => {
          window.location.href = `${window.location.origin}/psychologists`;
        });
    });
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          window.location.href = `${window.location.origin}/psychologists`;
        }}
      >
        Return
      </button>
      <h2 className={styles.header}>Form</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <h2>PERSONAL DATA</h2>
          <div className={styles.fields}>
            <input
              name="firstName"
              placeholder="Psychologist First Name"
              onChange={onChangeFirstNameValue}
              type="text"
              required
              pattern="[A-Za-z ]*"
              value={firstNameForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid First Name</span>
          <div className={styles.fields}>
            <input
              name="lastName"
              placeholder="Psychologist Last Name"
              onChange={onChangeLastNameValue}
              type="text"
              required
              pattern="[A-Za-z ]*"
              value={lastNameForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid Last Name</span>
          <div className={styles.fields}>
            <input
              name="username"
              placeholder="Psychologist Username"
              onChange={onChangeUsernameValue}
              type="text"
              required
              pattern="[A-Za-z ]*"
              value={usernameForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid Username</span>
          <div className={styles.fields}>
            <input
              name="password"
              onChange={onChangePasswordValue}
              placeholder="Psychologist Password"
              type="password"
              required
              value={passwordForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid Password</span>
          <div className={styles.fields}>
            <input
              name="email"
              placeholder="Psychologist Email"
              onChange={onChangeEmailValue}
              type="email"
              required
              pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
              value={emailForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid E-Mail</span>
          <div className={styles.fields}>
            <input
              name="phone"
              placeholder="Psychologist Phone"
              onChange={onChangePhoneValue}
              type="number"
              required
              value={phoneForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid Phone Number</span>
          <div className={styles.fields}>
            <input
              name="address"
              onChange={onChangeAddressValue}
              placeholder="Psychologist Address"
              type="text"
              required
              value={addressForm}
            />
          </div>
          <span className={styles.hiddenError}>Invalid Address</span>
        </div>
        <Availability
          data={psy.availability}
          action={changeDayAvail}
          from={changeHourAvailFrom}
          to={changeHourAvailTo}
        />
        <button type="submit">confirm</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
