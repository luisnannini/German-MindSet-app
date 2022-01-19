import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from 'redux/Profiles/thunks';
import { closeErrorModal } from 'redux/Postulants/actions';
import { Form, Field } from 'react-final-form';
import styles from './register.module.css';
import Input from 'Components/Shared/Input';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';
import Checkbox from 'Components/Shared/Checkbox';
import Select from 'Components/Shared/Select';
import { register, getPostulantData, login } from 'redux/Auth/thunks';

const PostulantsForm = () => {
  const error = useSelector((store) => store.postulants.error);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const profiles = useSelector((store) => store.profiles.list);

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  const submitForm = (formValues) => {
    dispatch(
      register({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        address: formValues.address,
        phone: formValues.phoneNumber,
        birthday: formValues.birthday,
        available: formValues.available,
        profiles: formValues.profiles
      })
    )
      .then(() => dispatch(login(formValues)))
      .then(() => {
        dispatch(getPostulantData(formValues.email));
        return history.push('/postulant/home');
      });
  };

  const validate = (formValues) => {
    const errors = {};
    // first name
    if (!formValues.firstName?.match(/^[a-zA-Z]+$/)) {
      errors.firstName = 'First name must contain only letters';
    }
    if (formValues.firstName?.length < 2) {
      errors.firstName = 'First name must be at least 2 letters';
    }
    // last name
    if (!formValues.lastName?.match(/^[a-zA-Z]+$/)) {
      errors.lastName = 'Last name must contain only letters';
    }
    if (formValues.lastName?.length < 2) {
      errors.lastName = 'Last name must be at least 2 letters';
    }
    // email
    if (!formValues.email?.match(/^[^@]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
      errors.email = 'Fill in a valid email format';
    }
    // password
    if (formValues.password?.search(/[a-zA-Z]/) < 0 || formValues.password?.search(/[0-9]/) < 0) {
      errors.password = 'Password must contain numbers and letters';
    } else if (formValues.password?.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    // address
    if (formValues.address?.search(/[a-zA-Z]/) < 0 || formValues.address?.search(/[0-9]/) < 0) {
      errors.address = 'Address must contain a name and a number';
    }
    // phoneNumber
    if (!formValues.phoneNumber?.toString().match(/^\d+$/)) {
      errors.phoneNumber = 'Phone number must contain only numbers';
    }
    if (formValues.phoneNumber?.length < 7 || formValues.phoneNumber?.length > 14) {
      errors.phoneNumber = 'Phone number must be between 7 and 14 numbers';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form
        onSubmit={submitForm}
        validate={validate}
        render={({ handleSubmit, pristine, submitting }) => {
          return (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.header}>
                <h2 className={styles.title}>{'Create an account'}</h2>
              </div>
              <h3>Personal Info</h3>
              <div className={styles.fields}>
                <div className={styles.columns}>
                  <Field
                    label={'First Name'}
                    name={'firstName'}
                    placeholder={'First Name'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Email'}
                    name={'email'}
                    placeholder={'Email'}
                    type={'email'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Address'}
                    name={'address'}
                    placeholder={'Address'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Birth Date'}
                    name={'birthday'}
                    type={'date'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    name={'available'}
                    label={'Available?'}
                    type={'checkbox'}
                    disabled={submitting}
                    component={Checkbox}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Last Name'}
                    name={'lastName'}
                    placeholder={'Last Name'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Password'}
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Phone Number'}
                    name={'phoneNumber'}
                    placeholder={'Phone Number'}
                    type={'tel'}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    name="profiles"
                    title={'Select a profile'}
                    label={'Profiles'}
                    object={profiles}
                    disabled={submitting}
                    component={Select}
                    validate={required}
                  />
                </div>
              </div>
              <div className={styles.button}>
                <ButtonCancel disabled={isLoading} onClick={() => history.push('/auth/home')} />
                <ButtonConfirm disabled={submitting || pristine} type={'submit'} />
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default PostulantsForm;
