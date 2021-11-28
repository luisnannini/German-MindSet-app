import React from 'react';
import styles from './form.module.css';

const Form = () => {
  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form>
        <div>
          <input
            id="name"
            name="name"
            placeholder="Client name"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid name"
          />
        </div>
        <span className={styles.hiddenError}>Invalid name</span>
        <div>
          <input
            id="phone"
            name="phone"
            placeholder="Client phone"
            type="phone"
            required
            pattern="^[0-9,$]"
            title="Enter a valid phone number"
          />
        </div>
        <span className={styles.hiddenError}>Invalid phone number</span>
        <div>
          <input
            id="country"
            name="country"
            placeholder="Client country"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid country"
          />
        </div>
        <span className={styles.hiddenError}>Invalid country</span>
        <div>
          <input
            id="state"
            name="state"
            placeholder="Client state"
            type="text"
            pattern="[A-Za-z ]*"
            title="Enter a valid state"
            required
          />
        </div>
        <span className={styles.hiddenError}>Invalid state</span>
        <div>
          <input
            id="city"
            name="city"
            placeholder="Client city"
            type="text"
            required
            pattern="[A-Za-z ]*"
            title="Enter a valid city"
          />
        </div>
        <span className={styles.hiddenError}>Invalid city</span>
        <div>
          <input
            id="address"
            name="address"
            placeholder="Client address"
            type="address"
            required
            pattern="^[0-9,$], [A-Za-z ]"
            title="Enter a valid address"
          />
        </div>
        <span className={styles.hiddenError}>Invalid address</span>
      </form>
    </div>
  );
};

export default Form;
