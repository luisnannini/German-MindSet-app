import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select';

const Form = (props) => {
  if (props.showForm == false) {
    return null;
  }
  const [position, setPosition] = useState([]);
  const [postulant, setPostulant] = useState([]);
  const [interview, setInterview] = useState([]);
  const [positionValue, setPositionValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [interviewValue, setInterviewValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPosition(
          response.data.map((position) => ({
            _id: position._id,
            value: position._id,
            name: position.jobDescription
          }))
        );
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulant(
          response.data.map((postulant) => ({
            _id: postulant._id,
            value: postulant._id,
            name: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterview(
          response.data.map((interview) => ({
            _id: interview._id,
            value: interview._id,
            name: interview._id
          }))
        );
      })
      .catch((error) => error);
  }, []);
  const onChangePosition = (input) => {
    setPositionValue(input.target.value);
  };
  const onChangePostulant = (input) => {
    setPostulantValue(input.target.value);
  };
  const onChangeInterview = (input) => {
    setInterviewValue(input.target.value);
  };
  const onChangeResult = (input) => {
    setResultValue(input.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/applications`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positions: positionValue,
        postulants: postulantValue,
        interview: interviewValue,
        result: resultValue
      }),
      method: 'POST'
    };

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/applications';
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Create Application</h2>
      <div className={styles.inputs}>
        <Select
          label="Positions:"
          onChange={onChangePosition}
          value={positionValue}
          object={position}
          title="- Select a position -"
          required
        />
      </div>
      <div className={styles.inputs}>
        <Select
          label="Postulants:"
          onChange={onChangePostulant}
          value={postulantValue}
          object={postulant}
          title="- Select a postulant -"
          required
        />
      </div>
      <div className={styles.inputs}>
        <Select
          label="Id interview:"
          onChange={onChangeInterview}
          value={interviewValue}
          object={interview}
          title="- Select an interview -"
          required
        />
      </div>
      <div className={styles.inputs}>
        <label>Result:</label>
        <input
          class_id="input"
          value={resultValue}
          onChange={onChangeResult}
          placeholder="Result"
          required
        ></input>
      </div>
      <button onClick={props.onClose}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
