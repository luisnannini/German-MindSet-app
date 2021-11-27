import React from 'react';
import styles from './editbutton.module.css';
import edit from './edit.png';
import EditForm from '../EditForm';

const EditButton = () => {
  const showForm = () => {
    console.log('form');
  };

  return (
    <div>
      <button className={styles.button}>
        <img
          src={edit}
          alt="Edit"
          onClick={() => {
            showForm();
          }}
        />
      </button>
    </div>
  );
};

<EditForm />;

export default EditButton;
