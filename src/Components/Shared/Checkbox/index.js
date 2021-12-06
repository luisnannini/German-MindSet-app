import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
        <label className={styles.label}>{props.label}</label>
        <Checkbox>
            className={props.checkbox}
            onChange={props.onChange}
            disabled={props.isDiseabled}
            checked={props.checked}
        </Checkbox>
    </div>
  );
};

export default Checkbox;