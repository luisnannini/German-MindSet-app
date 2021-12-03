import styles from './form.module.css';
import { useState } from 'react';

const index = () => {
  const [error, setError] = useState('');

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

  const onSubmit = (e) => {
    e.preventDefault();
    let route = `${process.env.REACT_APP_API}/psychologists/`;
    let jsonData = {
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
    };
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    };
    fetch(route, options).then((response) => {
      if (response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response
        .json()
        .catch((error) => {
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
        <h2 className={styles.container}>Availability</h2>
        <div>
          <p>Monday</p>
          <input
            name="monday-availability"
            day="monday"
            type="checkbox"
            defaultChecked={mondayBool}
            onChange={onChangeMondayBool}
          />
          <input
            name="monday-from"
            placeholder="From"
            type="string"
            onChange={onChangeMondayFrom}
            value={mondayFrom}
          />
          <input
            name="monday-to"
            placeholder="To"
            type="string"
            onChange={onChangeMondayTo}
            value={mondayTo}
          />
        </div>
        <div>
          <p>Tuesday</p>
          <input
            name="tuesday-availability"
            type="checkbox"
            day="tuesday"
            defaultChecked={tuesdayBool}
            onChange={onChangeTuesdayBool}
          />
          <input
            name="tuesday-from"
            placeholder="From"
            type="string"
            onChange={onChangeTuesdayFrom}
            value={tuesdayFrom}
          />
          <input
            name="tuesday-to"
            placeholder="To"
            type="string"
            onChange={onChangeTuesdayTo}
            value={tuesdayTo}
          />
        </div>
        <div>
          <p>Wednesday</p>
          <input
            day="wednesday"
            name="wednesday-availability"
            type="checkbox"
            defaultChecked={wednesdayBool}
            onChange={onChangeWednesdayBool}
          />
          <input
            name="wednesday-from"
            placeholder="From"
            type="string"
            onChange={onChangeWednesdayFrom}
            value={wednesdayFrom}
          />
          <input
            name="wednesday-to"
            placeholder="To"
            type="string"
            onChange={onChangeWednesdayTo}
            value={wednesdayTo}
          />
        </div>
        <div>
          <p>Thursday</p>
          <input
            name="thursday-availability"
            day="thursday"
            type="checkbox"
            defaultChecked={thursdayBool}
            onChange={onChangeThursdayBool}
          />
          <input
            name="thursday-from"
            placeholder="From"
            type="string"
            onChange={onChangeThursdayFrom}
            value={thursdayFrom}
          />
          <input
            name="thursday-to"
            placeholder="To"
            type="string"
            onChange={onChangeThursdayTo}
            value={thursdayTo}
          />
        </div>
        <div>
          <p>Friday</p>
          <input
            name="friday-availability"
            day="friday"
            type="checkbox"
            defaultChecked={fridayBool}
            onChange={onChangeFridayBool}
          />
          <input
            name="friday-from"
            placeholder="From"
            type="string"
            onChange={onChangeFridayFrom}
            value={fridayFrom}
          />
          <input
            name="friday-to"
            placeholder="To"
            type="string"
            onChange={onChangeFridayTo}
            value={fridayTo}
          />
        </div>
        <div>
          <p>Saturday</p>
          <input
            name="saturday-availability"
            day="saturday"
            type="checkbox"
            defaultChecked={saturdayBool}
            onChange={onChangeSaturdayBool}
          />
          <input
            name="saturday-from"
            placeholder="From"
            type="string"
            onChange={onChangeSaturdayFrom}
            value={saturdayFrom}
          />
          <input
            name="saturday-to"
            placeholder="To"
            type="string"
            onChange={onChangeSaturdayTo}
            value={saturdayTo}
          />
        </div>
        <div>
          <p>Sunday</p>
          <input
            name="sunday-availability"
            day="sunday"
            type="checkbox"
            defaultChecked={sundayBool}
            onChange={onChangeSundayBool}
          />
          <input
            name="sunday-from"
            placeholder="From"
            type="string"
            onChange={onChangeSundayFrom}
            value={sundayFrom}
          />
          <input
            name="sunday-to"
            placeholder="To"
            type="string"
            onChange={onChangeSundayTo}
            value={sundayTo}
          />
        </div>
        <button type="submit">confirm</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
