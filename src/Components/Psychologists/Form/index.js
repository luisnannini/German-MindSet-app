import styles from './form.module.css';
import Button from '../Button';
import Availability from './Availability';

const index = (props) => {
  const data = {
    _id: 'jorge',
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
  console.log(props);
  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form>
        <div>
          <input
            id="firstName"
            name="firstName"
            placeholder="Psychologist First Name"
            value={psy.firstName}
            type="text"
            required
            pattern="[A-Za-z ]*"
          />
        </div>
        <span className={styles.hiddenError}>Invalid First Name</span>
        <div>
          <input
            id="lastName"
            name="lastName"
            placeholder="Psychologist Last Name"
            value={psy.lastName}
            type="text"
            required
            pattern="[A-Za-z ]*"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Last Name</span>
        <div>
          <input
            id="username"
            name="username"
            placeholder="Psychologist Username"
            value={psy.username}
            type="text"
            required
            pattern="[A-Za-z ]*"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Username</span>
        <div>
          <input
            id="password"
            name="password"
            value={psy.password}
            placeholder="Psychologist Password"
            type="text"
            required
          />
        </div>
        <span className={styles.hiddenError}>Invalid Password</span>
        <div>
          <input
            id="email"
            name="email"
            placeholder="Psychologist Email"
            value={psy.email}
            type="text"
            required
            pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
          />
        </div>
        <span className={styles.hiddenError}>Invalid E-Mail</span>
        <div>
          <input
            id="phone"
            name="phone"
            placeholder="Psychologist Phone"
            value={psy.phone}
            type="phone"
            required
            pattern="^[0-9,$]"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Phone Number</span>
        <div>
          <input
            id="address"
            name="address"
            value={psy.address}
            placeholder="Psychologist Address"
            type="text"
            required
          />
        </div>
        <span className={styles.hiddenError}>Invalid Address</span>
        <h2 className={styles.container}>Availability</h2>
        <Availability data={psy.availability} />
        <Button name={'CONFIRM'} />
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
