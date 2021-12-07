import { useEffect, useState } from 'react';
import styles from './form.module.css';
import ModalError from '../../Shared/ModalError';
import ButtonCancel from '../../Shared/ButtonCancel';
import ButtonConfirm from '../../Shared/ButtonConfirm';
import Input from '../../Shared/Input';
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
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPosition(
          response.data.map((position) => ({
            _id: position._id,
            value: position._id,
            name: position.jobDescription
          }))
        );
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulant(
          response.data.map((postulant) => ({
            _id: postulant._id,
            value: postulant._id,
            name: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setInterview(
          response.data.map((interview) => ({
            _id: interview._id,
            value: interview._id,
            name: interview._id
          }))
        );
      })
      .catch((error) => setError({ show: true, message: error.message, title: error.status }));
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
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = '/applications';
      })
      .catch((error) => {
        setError({ show: true, message: error.message, title: error.status });
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
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
      <Input
        label={'Result'}
        name={'result'}
        value={resultValue}
        onChange={onChangeResult}
        placeholder="Result"
        required={true}
        type={'text'}
      />
      <ButtonCancel onClick={props.onClose} />
      <ButtonConfirm type="submit" />
    </form>
  );
};

export default Form;
