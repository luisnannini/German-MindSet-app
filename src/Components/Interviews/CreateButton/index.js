import React from 'react';
import styles from './createbutton.module.css';
import CreateForm from '../CreateForm';
import create from './create.png';

const CreateButton = (props) => {
  return (
    <div>
      <img className={styles.createButton} src={create}></img>
      <CreateForm />
    </div>
  );
};

export default CreateButton;
