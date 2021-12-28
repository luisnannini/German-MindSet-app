import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPsychologist,
  getPsychologistById,
  updatePsychologist
} from 'redux/Psychologists/thunks';
import { closeErrorModal } from 'redux/Psychologists/actions';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Checkbox from 'Components/Shared/Checkbox';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';

const PsychologistsForm = () => {
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

  const submitPsychologist = (formValues) => {
    const psychologistId = query.get('_id');
    if (psychologistId) {
      dispatch(
        updatePsychologist(psychologistId, {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          username: formValues.username,
          password: formValues.password,
          email: formValues.email,
          phone: Number(formValues.phone),
          address: formValues.address,
          availability: {
            monday: {
              availability: formValues.mondayBool,
              from: formValues.mondayBool ? formValues.mondayFrom : '',
              to: formValues.mondayBool ? formValues.mondayTo : ''
            },
            tuesday: {
              availability: formValues.tuesdayBool,
              from: formValues.tuesdayBool ? formValues.tuesdayFrom : '',
              to: formValues.tuesdayBool ? formValues.tuesdayTo : ''
            },
            wednesday: {
              availability: formValues.wednesdayBool,
              from: formValues.wednesdayBool ? formValues.wednesdayFrom : '',
              to: formValues.wednesdayBool ? formValues.wednesdayTo : ''
            },
            thursday: {
              availability: formValues.thursdayBool,
              from: formValues.thursdayBool ? formValues.thursdayFrom : '',
              to: formValues.thursdayBool ? formValues.thursdayTo : ''
            },
            friday: {
              availability: formValues.fridayBool,
              from: formValues.fridayBool ? formValues.fridayFrom : '',
              to: formValues.fridayBool ? formValues.fridayTo : ''
            },
            saturday: {
              availability: formValues.saturdayBool,
              from: formValues.saturdayBool ? formValues.saturdayFrom : '',
              to: formValues.saturdayBool ? formValues.saturdayTo : ''
            },
            sunday: {
              availability: formValues.sundayBool,
              from: formValues.sundayBool ? formValues.sundayFrom : '',
              to: formValues.sundayBool ? formValues.sundayTo : ''
            }
          }
        })
      ).then((response) => {
        if (response) history.push('/admin/psychologists');
      });
    } else {
      dispatch(
        createPsychologist({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          username: formValues.username,
          password: formValues.password,
          email: formValues.email,
          phone: Number(formValues.phone),
          address: formValues.address,
          availability: {
            monday: {
              availability: formValues.mondayBool,
              from: formValues.mondayBool ? formValues.mondayFrom : '',
              to: formValues.mondayBool ? formValues.mondayTo : ''
            },
            tuesday: {
              availability: formValues.tuesdayBool,
              from: formValues.tuesdayBool ? formValues.tuesdayFrom : '',
              to: formValues.tuesdayBool ? formValues.tuesdayTo : ''
            },
            wednesday: {
              availability: formValues.wednesdayBool,
              from: formValues.wednesdayBool ? formValues.wednesdayFrom : '',
              to: formValues.wednesdayBool ? formValues.wednesdayTo : ''
            },
            thursday: {
              availability: formValues.thursdayBool,
              from: formValues.thursdayBool ? formValues.thursdayFrom : '',
              to: formValues.thursdayBool ? formValues.thursdayTo : ''
            },
            friday: {
              availability: formValues.fridayBool,
              from: formValues.fridayBool ? formValues.fridayFrom : '',
              to: formValues.fridayBool ? formValues.fridayTo : ''
            },
            saturday: {
              availability: formValues.saturdayBool,
              from: formValues.saturdayBool ? formValues.saturdayFrom : '',
              to: formValues.saturdayBool ? formValues.saturdayTo : ''
            },
            sunday: {
              availability: formValues.sundayBool,
              from: formValues.sundayBool ? formValues.sundayFrom : '',
              to: formValues.sundayBool ? formValues.sundayTo : ''
            }
          }
        })
      ).then((response) => {
        if (response) history.push('/admin/psychologists');
      });
    }
  };
  const required = (value) => (value ? undefined : 'Required');
  const validate = (formValues) => {
    const errors = {};
    if (formValues.mondayBool && !formValues.mondayFrom) {
      errors.mondayFrom = 'Required';
    }
    if (formValues.mondayBool && !formValues.mondayTo) {
      errors.mondayTo = 'Required';
    }
    if (formValues.tuesdayBool && !formValues.tuesdayFrom) {
      errors.tuesdayFrom = 'Required';
    }
    if (formValues.tuesdayBool && !formValues.tuesdayTo) {
      errors.tuesdayTo = 'Required';
    }
    if (formValues.wednesdayBool && !formValues.wednesdayFrom) {
      errors.wednesdayFrom = 'Required';
    }
    if (formValues.wednesdayBool && !formValues.wednesdayTo) {
      errors.wednesdayTo = 'Required';
    }
    if (formValues.thursdayBool && !formValues.thursdayFrom) {
      errors.thursdayFrom = 'Required';
    }
    if (formValues.thursdayBool && !formValues.thursdayTo) {
      errors.thursdayTo = 'Required';
    }
    if (formValues.fridayBool && !formValues.fridayFrom) {
      errors.fridayFrom = 'Required';
    }
    if (formValues.fridayBool && !formValues.fridayTo) {
      errors.fridayTo = 'Required';
    }
    if (formValues.saturdayBool && !formValues.saturdayFrom) {
      errors.saturdayFrom = 'Required';
    }
    if (formValues.saturdayBool && !formValues.saturdayTo) {
      errors.saturdayTo = 'Required';
    }
    if (formValues.sundayBool && !formValues.sundayFrom) {
      errors.sundayFrom = 'Required';
    }
    if (formValues.sundayBool && !formValues.sundayTo) {
      errors.sundayTo = 'Required';
    }

    if (!formValues.firstName?.match(/^[a-zA-Z]{3,}$/)) {
      errors.firstName = 'Input should contain only more than three letters';
    }
    if (!formValues.lastName?.match(/^[a-zA-Z]{3,}$/)) {
      errors.lastName = 'Input should contain only more than three letters';
    }
    if (!formValues.email?.match(/^[^@]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
      errors.email = 'Fill in a valid email format';
    }
    if (
      !/\d/.test(formValues.password) ||
      !/[a-zA-Z]/.test(formValues.password) ||
      !formValues.password?.match(/^\w{3,}$/)
    ) {
      errors.password = 'Must have at least one number and one letter and three characters long';
    }
    if (!formValues.address?.match(/^[a-zA-Z ]{3,} [0-9]{1,5}$/)) {
      errors.address = 'Fill in a street name and number';
    }
    if (!formValues.phone?.toString().match(/^\d{3,25}$/)) {
      errors.phone = 'Input should contain between 3 and 25 numbers';
    }
    return errors;
  };
  return (
    <div className={styles.container}>
      <Form onSubmit={submitPsychologist} validate={validate}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {psychologistId ? 'Update Psychologist' : 'Create a Psychologist'}
              </h2>
            </div>
            <div className={styles.fields}>
              <div className={styles.columns}>
                <Field
                  label={'First Name'}
                  name={'firstName'}
                  initialValue={firstNameForm}
                  placeholder={'First Name'}
                  validate={required}
                  component={Input}
                  disabled={formProps.submitting}
                />
                <Field
                  label={'Last Name'}
                  name={'lastName'}
                  initialValue={lastNameForm}
                  placeholder={'Last Name'}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
                <Field
                  label={'Username'}
                  name={'username'}
                  initialValue={usernameForm}
                  placeholder={'Username'}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
                <Field
                  label={'Password'}
                  name={'password'}
                  type="password"
                  placeholder={'Password'}
                  initialValue={passwordForm}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  label={'Email'}
                  type={'email'}
                  name={'email'}
                  initialValue={emailForm}
                  placeholder={'Email'}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
                <Field
                  label={'Phone'}
                  name={'phone'}
                  initialValue={phoneForm}
                  placeholder={'Phone'}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
                <Field
                  label={'Address'}
                  name={'address'}
                  initialValue={addressForm}
                  placeholder={'Address'}
                  validate={required}
                  disabled={formProps.submitting}
                  component={Input}
                />
              </div>
            </div>
            <div className={styles.availabilityTitle}>
              <h2>Availability</h2>
            </div>
            <div className={styles.availability}>
              <div className={styles.columnsAvailability}>
                <Field
                  label="Monday"
                  initialValue={mondayBool}
                  name={'mondayBool'}
                  day="monday"
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'mondayFrom'}
                    type="time"
                    initialValue={mondayFrom}
                    disabled={!formProps.values.mondayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'mondayTo'}
                    type="time"
                    initialValue={mondayTo}
                    disabled={!formProps.values.mondayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
                <Field
                  label="Tuesday"
                  name={'tuesdayBool'}
                  initialValue={!!tuesdayBool}
                  day="tuesday"
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'tuesdayFrom'}
                    type="time"
                    initialValue={tuesdayFrom}
                    disabled={!formProps.values.tuesdayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'tuesdayTo'}
                    type="time"
                    initialValue={tuesdayTo}
                    disabled={!formProps.values.tuesdayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
                <Field
                  label="Wednesday"
                  initialValue={wednesdayBool}
                  name={'wednesdayBool'}
                  day="wednesday"
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'wednesdayFrom'}
                    initialValue={wednesdayFrom}
                    type="time"
                    disabled={!formProps.values.wednesdayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'to'}
                    name={'wednesdayTo'}
                    initialValue={wednesdayTo}
                    type="time"
                    disabled={!formProps.values.wednesdayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
                <Field
                  label="Thursday"
                  initialValue={thursdayBool}
                  name={'thursdayBool'}
                  day="thursday"
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'thursdayFrom'}
                    initialValue={thursdayFrom}
                    type="time"
                    disabled={!formProps.values.thursdayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'thursdayTo'}
                    initialValue={thursdayTo}
                    type="time"
                    disabled={!formProps.values.thursdayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
              </div>
              <div className={styles.columnsAvailability}>
                <Field
                  label="Friday"
                  initialValue={fridayBool}
                  name={'fridayBool'}
                  day="friday"
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'fridayFrom'}
                    initialValue={fridayFrom}
                    type="time"
                    disabled={!formProps.values.fridayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'fridayTo'}
                    initialValue={fridayTo}
                    type="time"
                    disabled={!formProps.values.fridayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
                <Field
                  label="Saturday"
                  initialValue={saturdayBool}
                  day="saturday"
                  type="checkbox"
                  name={'saturdayBool'}
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'saturdayFrom'}
                    initialValue={saturdayFrom}
                    type="time"
                    disabled={!formProps.values.saturdayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'saturdayTo'}
                    initialValue={saturdayTo}
                    type="time"
                    disabled={!formProps.values.saturdayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
                <Field
                  label="Sunday"
                  initialValue={sundayBool}
                  day="sunday"
                  name={'sundayBool'}
                  type="checkbox"
                  disabled={formProps.submitting}
                  component={Checkbox}
                />
                <div className={styles.dayColumns}>
                  <Field
                    label={'From'}
                    name={'sundayFrom'}
                    initialValue={sundayFrom}
                    type="time"
                    disabled={!formProps.values.sundayBool || formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'To'}
                    name={'sundayTo'}
                    initialValue={sundayTo}
                    type="time"
                    disabled={!formProps.values.sundayBool || formProps.submitting}
                    component={Input}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={formProps.submitting}
                onClick={() => history.push('/admin/psychologists')}
              />
              <ButtonConfirm disabled={formProps.submitting || formProps.pristine} type="submit" />
            </div>
            <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
          </form>
        )}
      </Form>
    </div>
  );
};

export default PsychologistsForm;
