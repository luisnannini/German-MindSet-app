import { useEffect, useState } from 'react';
import styles from './form.module.css';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';

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
        setPosition(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulant(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterview(response.data);
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
        <label>Position:</label>
        <select onChange={onChangePosition} required>
          <option value="" disabled hidden selected>
            - Select an option -
          </option>
          {position.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data.jobDescription}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.inputs}>
        <label>Postulant:</label>
        <select onChange={onChangePostulant} required>
          <option value="" disabled hidden selected>
            - Select an option -
          </option>
          {postulant.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data.firstName + ' ' + data.lastName}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.inputs}>
        <label>ID Interview:</label>
        <select onChange={onChangeInterview} required>
          <option value="" disabled hidden selected>
            - Select an option -
          </option>
          {interview.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data._id}
              </option>
            );
          })}
        </select>
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
      <ButtonCancel onClick={props.onClose} />
      <ButtonConfirm type="submit" />
    </form>
  );
};

export default Form;
