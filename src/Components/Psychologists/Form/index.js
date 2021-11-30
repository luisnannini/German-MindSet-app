import styles from './form.module.css';
import Availability from './Availability';
import { useState, useEffect } from 'react';
import availability from './Availability';

const index = (props) => {
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [usernameForm, setUsername] = useState('');
  const [passwordForm, setPassword] = useState('');
  const [emailForm, setEmail] = useState('');
  const [phoneForm, setPhone] = useState('');
  const [addressForm, setAddress] = useState('');

  const [mondayBool, setMondayBool] = useState('false');
  const [mondayFrom, setMondayFrom] = useState('');
  const [mondayTo, setMondayTo] = useState('');

  const [tuesdayBool, setTuesdayBool] = useState('false');
  const [tuesdayFrom, setTuesdayFrom] = useState('');
  const [tuesdayTo, setTuesdayTo] = useState('');

  const [wednesdayBool, setWednesdayBool] = useState('false');
  const [wednesdayFrom, setWednesdayFrom] = useState('');
  const [wednesdayTo, setWednesdayTo] = useState('');

  const [thursdayBool, setThursdayBool] = useState('false');
  const [thursdayFrom, setThursdayFrom] = useState('');
  const [thursdayTo, setThursdayTo] = useState('');

  const [fridayBool, setFridayBool] = useState('false');
  const [fridayFrom, setFridayFrom] = useState('');
  const [fridayTo, setFridayTo] = useState('');

  const [saturdayBool, setSaturdayBool] = useState('false');
  const [saturdayFrom, setSaturdayFrom] = useState('');
  const [saturdayTo, setSaturdayTo] = useState('');

  const [sundayBool, setSundayBool] = useState('false');
  const [sundayFrom, setSundayFrom] = useState('');
  const [sundayTo, setSundayTo] = useState('');

  const [availabilityForm, setAvailability] = useState({
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
  });

  useEffect(() => {
    if (props.psy) {
      return setFirstName(props.psy.firstName);
    }
  }, []);

  const data = {
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
    console.log(param);
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
    console.log(param);
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
    console.log(param);
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
    const options = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameForm,
        lastName: lastNameForm,
        username: usernameForm,
        password: passwordForm,
        email: emailForm,
        phone: phoneForm,
        address: addressForm,
        availability: availabilityForm
      })
    };
    fetch(`${process.env.REACT_APP_API}/psychologists/`, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          console.log(message);
          throw new Error(message);
        });
      }
      return response.json().finally(() => {
        window.location.href = `${window.location.origin}/psychologists/`;
      });
    });
  };

  let psy = {};

  if (!props.data) {
    psy = data;
  } else {
    psy = props.data;
  }

  return (
    <div className={styles.container}>
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
            />
          </div>
          <span className={styles.hiddenError}>Invalid Password</span>
          <div className={styles.fields}>
            <input
              name="email"
              placeholder="Psychologist Email"
              onChange={onChangeEmailValue}
              type="text"
              required
              pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
            />
          </div>
          <span className={styles.hiddenError}>Invalid E-Mail</span>
          <div className={styles.fields}>
            <input
              name="phone"
              placeholder="Psychologist Phone"
              onChange={onChangePhoneValue}
              type="phone"
              required
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
            />
          </div>
          <span className={styles.hiddenError}>Invalid Address</span>
        </div>
        <Availability
          data={psy.availability}
          field={setAvailability}
          action={changeDayAvail}
          from={changeHourAvailFrom}
          to={changeHourAvailTo}
        />
        <button name={'CONFIRM'} type={'submit'} />
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
