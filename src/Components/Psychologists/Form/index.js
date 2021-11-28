import styles from './form.module.css';
import Button from '../Button';
import Availability from './Availability';
import ModalOther from '../PsychologistList/PsychologistOptions/ModalOther';
import { useState } from 'react';

const index = (props) => {
  const [modalOther, changeModalOther] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  /*let [available, setAvailable] = useState([
    data.availability.monday,
    data.availability.tuesday,
    data.availability.wednesday,
    data.availability.thursday,
    data.availability.friday,
    data.availability.saturday,
    data.availability.sunday
  ]);*/

  const modalOpenOther = () => {
    console.log(!modalOther);
    changeModalOther(!modalOther);
  };

  const onChangeFirstNameValue = (event) => {
    console.log(event.target.value);
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
  }; /*
  const onChangeSetAvailable = (event) => {
    const checked = event.target.checked;
    if (checked) {
      available.map((day) => {
        if(event.target.day ==)
      })
    }
  };
*/
  const createPsychologist = (psy) => {
    console.log(psy);
    fetch(`${process.env.REACT_APP_API}/psychologists`, {
      method: 'POST',
      body: JSON.stringify(psy),
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status !== 200) return new Error(JSON.stringify(response.json()));
        return response.status(200).json();
      })
      .catch((error) => {
        return error;
      });
  };

  const psychologist = {
    _id: '',
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    email: email,
    phone: phone,
    address: address,
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
  let psy = {};

  if (!props.data) {
    psy = data;
  } else {
    psy = props.data;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Form</h2>
      <form className={styles.form}>
        <div>
          <h2>PERSONAL DATA</h2>
          <div className={styles.fields}>
            <input
              id="firstName"
              name="firstName"
              placeholder="Psychologist First Name"
              onChange={onChangeFirstNameValue}
              value={psy.firstName}
              type="text"
              required
              pattern="[A-Za-z ]*"
            />
          </div>
          <span className={styles.hiddenError}>Invalid First Name</span>
          <div className={styles.fields}>
            <input
              id="lastName"
              name="lastName"
              placeholder="Psychologist Last Name"
              value={psy.lastName}
              onChange={onChangeLastNameValue}
              type="text"
              required
              pattern="[A-Za-z ]*"
            />
          </div>
          <span className={styles.hiddenError}>Invalid Last Name</span>
          <div className={styles.fields}>
            <input
              id="username"
              name="username"
              placeholder="Psychologist Username"
              value={psy.username}
              onChange={onChangeUsernameValue}
              type="text"
              required
              pattern="[A-Za-z ]*"
            />
          </div>
          <span className={styles.hiddenError}>Invalid Username</span>
          <div className={styles.fields}>
            <input
              id="password"
              name="password"
              value={psy.password}
              onChange={onChangePasswordValue}
              placeholder="Psychologist Password"
              type="text"
              required
            />
          </div>
          <span className={styles.hiddenError}>Invalid Password</span>
          <div className={styles.fields}>
            <input
              id="email"
              name="email"
              placeholder="Psychologist Email"
              onChange={onChangeEmailValue}
              value={psy.email}
              type="text"
              required
              pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
            />
          </div>
          <span className={styles.hiddenError}>Invalid E-Mail</span>
          <div className={styles.fields}>
            <input
              id="phone"
              name="phone"
              placeholder="Psychologist Phone"
              value={psy.phone}
              onChange={onChangePhoneValue}
              type="phone"
              required
              pattern="^[0-9,$]"
            />
          </div>
          <span className={styles.hiddenError}>Invalid Phone Number</span>
          <div className={styles.fields}>
            <input
              id="address"
              name="address"
              value={psy.address}
              onChange={onChangeAddressValue}
              placeholder="Psychologist Address"
              type="text"
              required
            />
          </div>
          <span className={styles.hiddenError}>Invalid Address</span>
        </div>
        <Availability data={psy.availability} />
      </form>
      <Button name={'CONFIRM'} action={() => createPsychologist(psychologist)} />
    </div>
  );
};

index.propTypes = {};

export default index;
