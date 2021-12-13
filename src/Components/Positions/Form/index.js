import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPosition,
  getPositionById,
  getPositions,
  updatePosition
} from '../../../redux/Positions/thunks';
import { closeErrorModal } from '../../../redux/Positions/actions';

const Form = () => {
  const [positionId, setPositionId] = useState(undefined);
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);

  const error = useSelector((store) => store.positions.error);
  const isLoading = useSelector((store) => store.positions.isLoading);

  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const positionId = query.get('_id');
    fetch(`${process.env.REACT_APP_API}/clients`)
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
      .then((response) => setClients(response.data))
      .catch((error) => error);

    fetch(`${process.env.REACT_APP_API}/profiles`)
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
        setProfiles(response.data);
      })
      .catch((error) => error);
    if (positionId) {
      dispatch(getPositionById(positionId)).then((selectedPosition) => {
        setPositionId(positionId);
        setClientValue(selectedPosition.client._id);
        setProfilesValue(selectedPosition.professionalProfiles._id);
        setJobDescriptionValue(selectedPosition.jobDescription);
        setVacancyValue(selectedPosition.vacancy);
        setIsOpenValue(selectedPosition.isOpen);
      });
    }
  }, []);

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangeProfilesValue = (event) => {
    setProfilesValue(event.target.value);
  };

  const onChangeJobDescriptionValue = (event) => {
    setJobDescriptionValue(event.target.value);
  };

  const onChangeVacancyValue = (event) => {
    setVacancyValue(event.target.value);
  };

  const onChangeIsOpenValue = (event) => {
    setIsOpenValue(event.target.checked);
  };

  const submitPosition = (event) => {
    event.preventDefault();
    const positionID = query.get('_id');
    if (positionID) {
      dispatch(
        updatePosition(positionID, {
          client: clientValue,
          jobDescription: jobDescriptionValue,
          vacancy: vacancyValue,
          professionalProfiles: profilesValue,
          isOpen: isOpenValue
        })
      ).then((response) => {
        if (response) {
          history.push('/positions');
          dispatch(getPositions());
        }
      });
    } else {
      dispatch(
        createPosition({
          client: clientValue,
          jobDescription: jobDescriptionValue,
          vacancy: vacancyValue,
          professionalProfiles: profilesValue,
          isOpen: isOpenValue
        })
      ).then((response) => {
        if (response) {
          history.push('/positions');
          dispatch(getPositions());
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitPosition}>
        <div className={styles.header}>
          <h2 className={styles.title}>{positionId ? 'Update a Position' : 'Create a Position'}</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Select
              label={'Clients'}
              title={'Select a Client'}
              value={clientValue}
              object={clients}
              onChange={onChangeClientValue}
              required
              disabled={isLoading}
            />
            <Input
              label={'Job Description'}
              name={'job-description'}
              value={jobDescriptionValue}
              placeholder={'Write a job description'}
              onChange={onChangeJobDescriptionValue}
              required={true}
              disabled={isLoading}
            />
            <Checkbox
              label={'Is Open?'}
              value={isOpenValue}
              onChange={onChangeIsOpenValue}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Select
              label={'Profiles'}
              title={'Select a Profile'}
              value={profilesValue}
              object={profiles}
              onChange={onChangeProfilesValue}
              required
              disabled={isLoading}
            />
            <Input
              label={'Vacancy'}
              name={'vacancy'}
              type={'number'}
              value={vacancyValue}
              placeholder={'Set the number of vacancies'}
              min={1}
              step={1}
              onChange={onChangeVacancyValue}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/positions/')} />
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
