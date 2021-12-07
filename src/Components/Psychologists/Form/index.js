import styles from './form.module.css';
import { useState, useEffect } from 'react';
import ModalError from '../../Shared/Modal-Error/modal-error';

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
    // setPsychologistId(psychologistId);
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
      <button
        onClick={() => {
          window.location.href = `${window.location.origin}/psychologists`;
        }}
      >
        Return
      </button>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Form</h2>
        <div>
          <h2 className={styles.title}>PERSONAL DATA</h2>
          <div className={styles.columns}></div>
          <div className={styles.columns}>
            <div className={styles.fields}>
              <input
                label="firstName"
                placeholder="Psychologist First Name"
                onChange={onChangeFirstNameValue}
                type="text"
                required
                pattern="[A-Za-z ]*"
                value={firstNameForm}
              />
            </div>
            <span className={styles.hiddenError}>First Name</span>
            <div className={styles.fields}>
              <input
                label="lastName"
                placeholder="Psychologist Last Name"
                onChange={onChangeLastNameValue}
                type="text"
                required
                pattern="[A-Za-z ]*"
                value={lastNameForm}
              />
            </div>
            <span className={styles.hiddenError}>Last Name</span>
            <div className={styles.fields}>
              <input
                label="username"
                placeholder="Psychologist Username"
                onChange={onChangeUsernameValue}
                type="text"
                required
                pattern="[A-Za-z ]*"
                value={usernameForm}
              />
            </div>
            <span className={styles.hiddenError}>Username</span>
            <div className={styles.fields}>
              <input
                label="password"
                onChange={onChangePasswordValue}
                placeholder="Psychologist Password"
                type="password"
                required
                value={passwordForm}
              />
            </div>
            <span className={styles.hiddenError}>Password</span>
            <div className={styles.fields}>
              <input
                label="email"
                placeholder="Psychologist Email"
                onChange={onChangeEmailValue}
                type="email"
                required
                pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
                value={emailForm}
              />
            </div>
            <span className={styles.hiddenError}>E-Mail</span>
            <div className={styles.fields}>
              <input
                label="phone"
                placeholder="Psychologist Phone"
                onChange={onChangePhoneValue}
                type="number"
                required
                value={phoneForm}
              />
            </div>
            <span className={styles.hiddenError}>Phone Number</span>
            <div className={styles.fields}>
              <input
                label="address"
                onChange={onChangeAddressValue}
                placeholder="Psychologist Address"
                type="text"
                required
                value={addressForm}
              />
            </div>
            <span className={styles.hiddenError}>Address</span>
          </div>
        </div>
        <h2 className={styles.container}>Availability</h2>
        <div>
          <p>Monday</p>
          <input
            label="monday-availability"
            day="monday"
            type="checkbox"
            defaultChecked={mondayBool}
            onChange={onChangeMondayBool}
          />
          <input
            label="monday-from"
            placeholder="From"
            type="string"
            onChange={onChangeMondayFrom}
            value={mondayFrom}
          />
          <input
            label="monday-to"
            placeholder="To"
            type="string"
            onChange={onChangeMondayTo}
            value={mondayTo}
          />
        </div>
        <div>
          <p>Tuesday</p>
          <input
            label="tuesday-availability"
            type="checkbox"
            day="tuesday"
            defaultChecked={tuesdayBool}
            onChange={onChangeTuesdayBool}
          />
          <input
            label="tuesday-from"
            placeholder="From"
            type="string"
            onChange={onChangeTuesdayFrom}
            value={tuesdayFrom}
          />
          <input
            label="tuesday-to"
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
            label="wednesday-availability"
            type="checkbox"
            defaultChecked={wednesdayBool}
            onChange={onChangeWednesdayBool}
          />
          <input
            label="wednesday-from"
            placeholder="From"
            type="string"
            onChange={onChangeWednesdayFrom}
            value={wednesdayFrom}
          />
          <input
            label="wednesday-to"
            placeholder="To"
            type="string"
            onChange={onChangeWednesdayTo}
            value={wednesdayTo}
          />
        </div>
        <div>
          <p>Thursday</p>
          <input
            label="thursday-availability"
            day="thursday"
            type="checkbox"
            defaultChecked={thursdayBool}
            onChange={onChangeThursdayBool}
          />
          <input
            label="thursday-from"
            placeholder="From"
            type="string"
            onChange={onChangeThursdayFrom}
            value={thursdayFrom}
          />
          <input
            label="thursday-to"
            placeholder="To"
            type="string"
            onChange={onChangeThursdayTo}
            value={thursdayTo}
          />
        </div>
        <div>
          <p>Friday</p>
          <input
            label="friday-availability"
            day="friday"
            type="checkbox"
            defaultChecked={fridayBool}
            onChange={onChangeFridayBool}
          />
          <input
            label="friday-from"
            placeholder="From"
            type="string"
            onChange={onChangeFridayFrom}
            value={fridayFrom}
          />
          <input
            label="friday-to"
            placeholder="To"
            type="string"
            onChange={onChangeFridayTo}
            value={fridayTo}
          />
        </div>
        <div>
          <p>Saturday</p>
          <input
            label="saturday-availability"
            day="saturday"
            type="checkbox"
            defaultChecked={saturdayBool}
            onChange={onChangeSaturdayBool}
          />
          <input
            label="saturday-from"
            placeholder="From"
            type="string"
            onChange={onChangeSaturdayFrom}
            value={saturdayFrom}
          />
          <input
            label="saturday-to"
            placeholder="To"
            type="string"
            onChange={onChangeSaturdayTo}
            value={saturdayTo}
          />
        </div>
        <div>
          <p>Sunday</p>
          <input
            label="sunday-availability"
            day="sunday"
            type="checkbox"
            defaultChecked={sundayBool}
            onChange={onChangeSundayBool}
          />
          <input
            label="sunday-from"
            placeholder="From"
            type="string"
            onChange={onChangeSundayFrom}
            value={sundayFrom}
          />
          <input
            label="sunday-to"
            placeholder="To"
            type="string"
            onChange={onChangeSundayTo}
            value={sundayTo}
          />
        </div>
        <button type="submit">confirm</button>
        <ModalError error={error} onConfirm={() => setError({ show: false })} />
      </form>
    </div>
  );
};

// Form.propTypes = {};

export default Form;
