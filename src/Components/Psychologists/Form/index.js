import styles from './form.module.css';
import Availability from './Availability';

const index = () => {
  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form>
        <div>
          <input
            id="firstName"
            name="firstName"
            placeholder="Psychologist First Name"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid first name"
          />
        </div>
        <span className={styles.hiddenError}>Invalid First Name</span>
        <div>
          <input
            id="lastName"
            name="lastName"
            placeholder="Psychologist Last Name"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid last name"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Last Name</span>
        <div>
          <input
            id="username"
            name="username"
            placeholder="Psychologist Username"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid username, only letters"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Username</span>
        <div>
          <input
            id="password"
            name="password"
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
            type="text"
            required
            pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
            title="Enter a valid email format"
          />
        </div>
        <span className={styles.hiddenError}>Invalid E-Mail</span>
        <div>
          <input
            id="phone"
            name="phone"
            placeholder="Psychologist Phone"
            type="phone"
            required
            pattern="^[0-9,$]"
            title="Enter a valid phone number"
          />
        </div>
        <span className={styles.hiddenError}>Invalid Phone Number</span>
        <div>
          <input
            id="address"
            name="address"
            placeholder="Psychologist Address"
            type="text"
            required
          />
        </div>
        <span className={styles.hiddenError}>Invalid Address</span>
        <h2 className={styles.container}>Availability</h2>
        <Availability />
      </form>
    </div>
  );
};

index.propTypes = {};

export default index;
