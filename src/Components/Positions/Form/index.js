import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import {
  createPosition,
  getPositionById,
  getPositions,
  updatePosition
} from '../../../redux/Positions/thunks';
import { getClients } from '../../../redux/Clients/thunks';
import { getProfiles } from '../../../redux/Profiles/thunks';
import { closeErrorModal } from '../../../redux/Positions/actions';
import styles from './form.module.css';
import Select from '../../Shared/Select';
import Input from '../../Shared/Input';
import Checkbox from '../../Shared/Checkbox';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/Modals/ModalError';

const Form = () => {
  const history = useHistory();

  const query = useQuery();

  const dispatch = useDispatch();

  const clients = useSelector((store) => store.clients.list);
  const profiles = useSelector((store) => store.profiles.list);

  const isLoading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);

  const [positionId, setPositionId] = useState(undefined);
  const [clientValue, setClientValue] = useState('');
  const [profilesValue, setProfilesValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState(false);

  useEffect(() => {
    const positionId = query.get('_id');
    if (!clients.length) {
      dispatch(getClients());
    }
    if (!profiles.length) {
      dispatch(getProfiles());
    }
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
  }, [clients, profiles]);

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
