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
          address: formValues.address
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
          address: formValues.address
        })
      ).then((response) => {
        if (response) history.push('/admin/psychologists');
      });
    }
  };
  const required = (value) => (value ? undefined : 'Required');
  const validate = (formValues) => {
    const errors = {};
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
