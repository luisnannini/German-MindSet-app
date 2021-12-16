import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPsychologist,
  getPsychologistById,
  updatePsychologist
} from '../../../../redux/Psychologists/thunks';
import { closeErrorModal } from '../../../../redux/Psychologists/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../../Shared/Input';
import Checkbox from '../../../Shared/Checkbox';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [psychologistId, setPsychologistId] = useState(0);
  const [firstNameForm, setFirstName] = useState('');
  const [lastNameForm, setLastName] = useState('');
  const [usernameForm, setUsername] = useState('');
  const [passwordForm, setPassword] = useState('');
  const [emailForm, setEmail] = useState('');
  const [phoneForm, setPhone] = useState('');
  const [addressForm, setAddress] = useState('');
  const [mondayBool, setMondayBool] = useState(false);
  const [tuesdayBool, setTuesdayBool] = useState(false);
  const [wednesdayBool, setWednesdayBool] = useState(false);
  const [thursdayBool, setThursdayBool] = useState(false);
  const [fridayBool, setFridayBool] = useState(false);
  const [saturdayBool, setSaturdayBool] = useState(false);
  const [sundayBool, setSundayBool] = useState(false);
  const [mondayFrom, setMondayFrom] = useState(0);
  const [tuesdayFrom, setTuesdayFrom] = useState(0);
  const [wednesdayFrom, setWednesdayFrom] = useState(0);
  const [thursdayFrom, setThursdayFrom] = useState(0);
  const [fridayFrom, setFridayFrom] = useState(0);
  const [saturdayFrom, setSaturdayFrom] = useState(0);
  const [sundayFrom, setSundayFrom] = useState(0);
  const [mondayTo, setMondayTo] = useState(0);
  const [tuesdayTo, setTuesdayTo] = useState(0);
  const [wednesdayTo, setWednesdayTo] = useState(0);
  const [thursdayTo, setThursdayTo] = useState(0);
  const [fridayTo, setFridayTo] = useState(0);
  const [saturdayTo, setSaturdayTo] = useState(0);
  const [sundayTo, setSundayTo] = useState(0);
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  const error = useSelector((store) => store.psychologists.error);
  const query = useQuery();

  useEffect(() => {
    const psychologistId = query.get('_id');
    if (psychologistId) {
      dispatch(getPsychologistById(psychologistId)).then((selectedPsychologist) => {
        setPsychologistId(psychologistId);
        setFirstName(selectedPsychologist.firstName);
        setLastName(selectedPsychologist.lastName);
        setUsername(selectedPsychologist.username);
        setEmail(selectedPsychologist.email);
        setPhone(selectedPsychologist.phone);
        setPassword(selectedPsychologist.password);
        setAddress(selectedPsychologist.address);
        setMondayBool(selectedPsychologist.availability.monday.availability);
        setTuesdayBool(selectedPsychologist.availability.tuesday.availability);
        setWednesdayBool(selectedPsychologist.availability.wednesday.availability);
        setThursdayBool(selectedPsychologist.availability.thursday.availability);
        setFridayBool(selectedPsychologist.availability.friday.availability);
        setSaturdayBool(selectedPsychologist.availability.saturday.availability);
        setSundayBool(selectedPsychologist.availability.sunday.availability);
        setMondayFrom(selectedPsychologist.availability.monday.from);
        setTuesdayFrom(selectedPsychologist.availability.tuesday.from);
        setWednesdayFrom(selectedPsychologist.availability.wednesday.from);
        setThursdayFrom(selectedPsychologist.availability.thursday.from);
        setFridayFrom(selectedPsychologist.availability.friday.from);
        setSaturdayFrom(selectedPsychologist.availability.saturday.from);
        setSundayFrom(selectedPsychologist.availability.sunday.from);
        setMondayTo(selectedPsychologist.availability.monday.to);
        setTuesdayTo(selectedPsychologist.availability.tuesday.to);
        setWednesdayTo(selectedPsychologist.availability.wednesday.to);
        setThursdayTo(selectedPsychologist.availability.thursday.to);
        setFridayTo(selectedPsychologist.availability.friday.to);
        setSaturdayTo(selectedPsychologist.availability.saturday.to);
        setSundayTo(selectedPsychologist.availability.sunday.to);
      });
    }
  }, []);

  const onChangeFirstNameValue = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastNameValue = (event) => {
    setLastName(event.target.value);
  };
  const onChangeUsernameValue = (event) => {
    setUsername(event.target.value);
  };
  const onChangePasswordValue = (event) => {
    setPassword(event.target.value);
  };
  const onChangeEmailValue = (event) => {
    setEmail(event.target.value);
  };
  const onChangePhoneValue = (event) => {
    setPhone(event.target.value);
  };
  const onChangeAddressValue = (event) => {
    setAddress(event.target.value);
  };

  // Availability

  const onChangeMondayBool = (event) => {
    setMondayBool(event.target.checked);
  };
  const onChangeTuesdayBool = (event) => {
    setTuesdayBool(event.target.checked);
  };
  const onChangeWednesdayBool = (event) => {
    setWednesdayBool(event.target.checked);
  };
  const onChangeThursdayBool = (event) => {
    setThursdayBool(event.target.checked);
  };
  const onChangeFridayBool = (event) => {
    setFridayBool(event.target.checked);
  };
  const onChangeSaturdayBool = (event) => {
    setSaturdayBool(event.target.checked);
  };
  const onChangeSundayBool = (event) => {
    setSundayBool(event.target.checked);
  };

  // Hour From

  const onChangeMondayFrom = (event) => {
    setMondayFrom(event.target.value);
  };
  const onChangeTuesdayFrom = (event) => {
    setTuesdayFrom(event.target.value);
  };
  const onChangeWednesdayFrom = (event) => {
    setWednesdayFrom(event.target.value);
  };
  const onChangeThursdayFrom = (event) => {
    setThursdayFrom(event.target.value);
  };
  const onChangeFridayFrom = (event) => {
    setFridayFrom(event.target.value);
  };
  const onChangeSaturdayFrom = (event) => {
    setSaturdayFrom(event.target.value);
  };
  const onChangeSundayFrom = (event) => {
    setSundayFrom(event.target.value);
  };

  // Hour To

  const onChangeMondayTo = (event) => {
    setMondayTo(event.target.value);
  };
  const onChangeTuesdayTo = (event) => {
    setTuesdayTo(event.target.value);
  };
  const onChangeWednesdayTo = (event) => {
    setWednesdayTo(event.target.value);
  };
  const onChangeThursdayTo = (event) => {
    setThursdayTo(event.target.value);
  };
  const onChangeFridayTo = (event) => {
    setFridayTo(event.target.value);
  };
  const onChangeSaturdayTo = (event) => {
    setSaturdayTo(event.target.value);
  };
  const onChangeSundayTo = (event) => {
    setSundayTo(event.target.value);
  };

  const submitPsychologist = (event) => {
    event.preventDefault();

    const psychologistId = query.get('_id');
    if (psychologistId) {
      dispatch(
        updatePsychologist(psychologistId, {
          firstName: firstNameForm,
          lastName: lastNameForm,
          username: usernameForm,
          password: passwordForm,
          email: emailForm,
          phone: parseInt(phoneForm),
          address: addressForm,
          availability: {
            monday: {
              availability: !!mondayBool,
              from: parseInt(mondayFrom, 10),
              to: parseInt(mondayTo, 10)
            },
            tuesday: {
              availability: !!tuesdayBool,
              from: parseInt(tuesdayFrom, 10),
              to: parseInt(tuesdayTo, 10)
            },
            wednesday: {
              availability: !!wednesdayBool,
              from: parseInt(wednesdayFrom, 10),
              to: parseInt(wednesdayTo, 10)
            },
            thursday: {
              availability: !!thursdayBool,
              from: parseInt(thursdayFrom, 10),
              to: parseInt(thursdayTo, 10)
            },
            friday: {
              availability: !!fridayBool,
              from: parseInt(fridayFrom, 10),
              to: parseInt(fridayTo, 10)
            },
            saturday: {
              availability: !!saturdayBool,
              from: parseInt(saturdayFrom, 10),
              to: parseInt(saturdayTo, 10)
            },
            sunday: {
              availability: !!sundayBool,
              from: parseInt(sundayFrom, 10),
              to: parseInt(sundayTo, 10)
            }
          }
        })
      ).then((response) => {
        if (response) history.push('/admin/psychologists/list');
      });
    } else {
      dispatch(
        createPsychologist({
          firstName: firstNameForm,
          lastName: lastNameForm,
          username: usernameForm,
          password: passwordForm,
          email: emailForm,
          phone: parseInt(phoneForm),
          address: addressForm,
          availability: {
            monday: {
              availability: !!mondayBool,
              from: parseInt(mondayFrom, 10),
              to: parseInt(mondayTo, 10)
            },
            tuesday: {
              availability: !!tuesdayBool,
              from: parseInt(tuesdayFrom, 10),
              to: parseInt(tuesdayTo, 10)
            },
            wednesday: {
              availability: !!wednesdayBool,
              from: parseInt(wednesdayFrom, 10),
              to: parseInt(wednesdayTo, 10)
            },
            thursday: {
              availability: !!thursdayBool,
              from: parseInt(thursdayFrom, 10),
              to: parseInt(thursdayTo, 10)
            },
            friday: {
              availability: !!fridayBool,
              from: parseInt(fridayFrom, 10),
              to: parseInt(fridayTo, 10)
            },
            saturday: {
              availability: !!saturdayBool,
              from: parseInt(saturdayFrom, 10),
              to: parseInt(saturdayTo, 10)
            },
            sunday: {
              availability: !!sundayBool,
              from: parseInt(sundayFrom, 10),
              to: parseInt(sundayTo, 10)
            }
          }
        })
      ).then((response) => {
        if (response) history.push('/admin/psychologists/list');
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitPsychologist}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {psychologistId ? 'Update Psychologist' : 'Create a Psychologist'}
          </h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'First Name'}
              name={'firstName'}
              type={'text'}
              value={firstNameForm}
              placeholder={'First Name'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeFirstNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Last Name'}
              name={'lastName'}
              type={'text'}
              value={lastNameForm}
              placeholder={'Last Name'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeLastNameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Username'}
              name={'username'}
              type={'text'}
              value={usernameForm}
              placeholder={'Username'}
              pattern={'[A-Za-z ]*'}
              onChange={onChangeUsernameValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Password'}
              name={'password'}
              type="password"
              value={passwordForm}
              onChange={onChangePasswordValue}
              required={true}
              disabled={isLoading}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Email'}
              type={'email'}
              value={emailForm}
              placeholder={'Email'}
              pattern={'^[^@]+@[^@]+.[a-zA-Z]{2,}$'}
              onChange={onChangeEmailValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Phone'}
              name={'phone'}
              type={'number'}
              value={phoneForm}
              placeholder={'Phone'}
              onChange={onChangePhoneValue}
              required={true}
              disabled={isLoading}
            />
            <Input
              label={'Address'}
              name={'address'}
              type={'text'}
              value={addressForm}
              placeholder={'Address'}
              onChange={onChangeAddressValue}
              required={true}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={styles.availabilityTitle}>
          <h2>Availability</h2>
        </div>
        <div className={styles.availability}>
          <div className={styles.columnsAvailability}>
            <Checkbox
              label="Monday"
              value={mondayBool}
              day="monday"
              onChange={onChangeMondayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'monday-from'}
                type={'text'}
                value={mondayFrom}
                placeholder={'From'}
                onChange={onChangeMondayFrom}
                disabled={!mondayBool}
              />
              <Input
                label={'To'}
                name={'monday-to'}
                type={'text'}
                value={mondayTo}
                placeholder={'To'}
                onChange={onChangeMondayTo}
                disabled={!mondayBool}
              />
            </div>
            <Checkbox
              label="Tuesday"
              value={tuesdayBool}
              day="tuesday"
              onChange={onChangeTuesdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'tuesday-to'}
                type={'string'}
                placeholder={'To'}
                value={tuesdayFrom}
                onChange={onChangeTuesdayFrom}
                disabled={!tuesdayBool}
              />
              <Input
                label={'To'}
                name={'tuesday-to'}
                type={'text'}
                placeholder={'To'}
                value={tuesdayTo}
                onChange={onChangeTuesdayTo}
                disabled={!tuesdayBool}
              />
            </div>
            <Checkbox
              label="Wednesday"
              value={wednesdayBool}
              day="wednesday"
              onChange={onChangeWednesdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'wednesday-from'}
                type={'text'}
                value={wednesdayFrom}
                placeholder={'From'}
                onChange={onChangeWednesdayFrom}
                disabled={!wednesdayBool}
              />
              <Input
                label={'to'}
                name={'wednesday-to'}
                type={'text'}
                value={wednesdayTo}
                placeholder={'To'}
                onChange={onChangeWednesdayTo}
                disabled={!wednesdayBool}
              />
            </div>
            <Checkbox
              label="Thursday"
              value={thursdayBool}
              day="thursday"
              onChange={onChangeThursdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'thursday-from'}
                type={'text'}
                value={thursdayFrom}
                placeholder={'From'}
                onChange={onChangeThursdayFrom}
                disabled={!thursdayBool}
              />
              <Input
                label={'To'}
                name={'thursday-to'}
                type={'text'}
                value={thursdayTo}
                placeholder={'To'}
                onChange={onChangeThursdayTo}
                disabled={!thursdayBool}
              />
            </div>
          </div>
          <div className={styles.columnsAvailability}>
            <Checkbox
              label="Friday"
              value={fridayBool}
              day="friday"
              onChange={onChangeFridayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'friday-from'}
                type={'text'}
                value={fridayFrom}
                placeholder={'From'}
                onChange={onChangeFridayFrom}
                disabled={!fridayBool}
              />
              <Input
                label={'To'}
                name={'friday-to'}
                type={'text'}
                value={fridayTo}
                placeholder={'To'}
                onChange={onChangeFridayTo}
                disabled={!fridayBool}
              />
            </div>
            <Checkbox
              label="Saturday"
              value={saturdayBool}
              day="saturday"
              onChange={onChangeSaturdayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'saturday-from'}
                type={'text'}
                value={saturdayFrom}
                placeholder={'From'}
                onChange={onChangeSaturdayFrom}
                disabled={!saturdayBool}
              />
              <Input
                label={'To'}
                name={'saturday-to'}
                type={'text'}
                value={saturdayTo}
                placeholder={'To'}
                onChange={onChangeSaturdayTo}
                disabled={!saturdayBool}
              />
            </div>
            <Checkbox
              label="Sunday"
              value={sundayBool}
              day="sunday"
              onChange={onChangeSundayBool}
              disabled={isLoading}
            />
            <div className={styles.dayColumns}>
              <Input
                label={'From'}
                name={'sunday-from'}
                type={'text'}
                value={sundayFrom}
                placeholder={'From'}
                onChange={onChangeSundayFrom}
                disabled={!sundayBool}
              />
              <Input
                label={'To'}
                name={'sunday-to'}
                type={'text'}
                value={sundayTo}
                placeholder={'To'}
                onChange={onChangeSundayTo}
                disabled={!sundayBool}
              />
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <ButtonCancel disabled={isLoading} onClick={() => history.push('/admin/psychologists')} />
          <ButtonConfirm disabled={isLoading} type="submit" />
        </div>
        <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      </form>
    </div>
  );
};

export default Form;
