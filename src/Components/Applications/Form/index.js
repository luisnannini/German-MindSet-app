import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import { useSelector, useDispatch } from 'react-redux';
import { createApplication } from '../../../redux/Applications/thunks';
import { applicationsErrorModal } from '../../../redux/Applications/actions';

const Form = () => {
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

  const isLoading = useSelector((store) => store.applications.isLoading);

  const dispatch = useDispatch();
  const history = useHistory();

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

  const submitApplications = (e) => {
    e.preventDefault();

    dispatch(
      createApplication({
        positions: positionValue,
        postulants: postulantValue,
        interview: interviewValue,
        result: resultValue
      })
    ).then((response) => {
      if (response) history.push('/applications');
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitApplications}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create Application</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              label="Positions:"
              title="- Select a position -"
              value={positionValue}
              object={position}
              onChange={onChangePosition}
              required
              disabled={isLoading}
            />
            <Select
              label="Postulants:"
              title="- Select a postulant -"
              value={postulantValue}
              object={postulant}
              onChange={onChangePostulant}
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Select
              label="Id interview:"
              title="- Select an interview -"
              value={interviewValue}
              object={interview}
              onChange={onChangeInterview}
              required
              disabled={isLoading}
            />
            <Input
              label={'Result'}
              name={'result'}
              type={'text'}
              value={resultValue}
              placeholder="Result"
              onChange={onChangeResult}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Link to="/applications">
            <ButtonCancel disabled={isLoading} />
          </Link>
          <ButtonConfirm type="submit" disabled={isLoading} />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(applicationsErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
