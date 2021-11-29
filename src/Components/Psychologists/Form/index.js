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

  const modalOpenOther = () => {
    console.log(!modalOther);
    changeModalOther(!modalOther);
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
  const psychologistFetch = () => {
    fetch(`${process.env.REACT_APP_API}/psychologists/${props._id}`).then((response) => {
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setUsername(response.username);
      setPassword(response.password);
      setEmail(response.email);
      setPhone(response.phone);
      setAddress(response.address);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      })
    };

    fetch(`${process.env.REACT_APP_API}/psychologists/`, options).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          console.log(message);
          throw new Error(message);
        });
      }
      return response.json().then(() => {
        window.location.href = `${window.location.origin}/psychologists/`;
      });
    });
  };

  const psychologist = {
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
        <Availability data={psy.availability} />
        <button name={'CONFIRM'} type={'submit'} />
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
