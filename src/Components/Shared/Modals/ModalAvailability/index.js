import React from 'react';
import styles from './modalAvailability.module.css';
import ButtonCancel from '../../Buttons/ButtonCancel';

const ModalAvailability = (props) => {
  if (!props.show) {
    return null;
  }

  const data = props.data;
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.availability}>
          <div className={styles.columns}>
            <div className={styles.days}>
              <h2>Monday</h2>
              <div>
                {data.monday.availability
                  ? `Available from ${data.monday.from} to ${data.monday.to}`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.days}>
              <h2>Tuesday</h2>
              <div>
                {data.tuesday.availability
                  ? `Available from ${data.tuesday.from} to ${data.tuesday.to}`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.days}>
              <h2>Wednesday</h2>
              <div>
                {data.wednesday.availability
                  ? `Available from ${data.wednesday.from} to ${data.wednesday.to}`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.days}>
              <h2>Thursday</h2>
              <div>
                {data.thursday.availability
                  ? `Available from ${data.thursday.from} to ${data.thursday.to}`
                  : 'Not Available'}
              </div>
            </div>
          </div>
          <div className={styles.columns}>
            <div className={styles.days}>
              <h2>Friday</h2>
              <div>
                {data.friday.availability
                  ? `Available from ${data.friday.from} to ${data.friday.to}`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.days}>
              <h2>Saturday</h2>
              <div>
                {data.saturday.availability
                  ? `Available from ${data.saturday.from} to ${data.saturday.to}`
                  : 'Not Available'}
              </div>
            </div>
            <div className={styles.days}>
              <h2>Sunday</h2>
              <div>
                {data.sunday.availability
                  ? `Available from ${data.sunday.from} to ${data.sunday.to}`
                  : 'Not Available'}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <ButtonCancel disabled={props.isLoading} onClick={props.onCancel} />
        </div>
      </div>
    </div>
  );
};

export default ModalAvailability;
