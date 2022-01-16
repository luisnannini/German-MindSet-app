import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulantById, getPostulants } from 'redux/Postulants/thunks';
import { closeErrorModal } from 'redux/Postulants/actions';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import useQuery from 'Hooks/useQuery';
import styles from './register.module.css';
import Input from 'Components/Shared/Input';
import ButtonCancel from 'Components/Shared/Buttons/ButtonCancel';
import ButtonConfirm from 'Components/Shared/Buttons/ButtonConfirm';
import ModalError from 'Components/Shared/Modals/ModalError';
import Checkbox from 'Components/Shared/Checkbox';
import Select from 'Components/Shared/Select';
import { register } from 'redux/Auth/thunks';

const PostulantsForm = () => {
  const error = useSelector((store) => store.postulants.error);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const [id, setPostulantId] = useState(undefined);
  const [profiles, setProfiles] = useState([]);
  const [postulantProfile, setPostulantProfile] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    birthday: '',
    available: false
  });
  const [primaryStudies, setPrimaryStudies] = useState({
    startDate: '',
    endDate: '',
    school: ''
  });
  const [secondaryStudies, setSecondaryStudies] = useState({
    startDate: '',
    endDate: '',
    school: ''
  });
  const [tertiaryStudies, setTertiaryStudies] = useState([]);
  const [universityStudies, setUniversityStudies] = useState([]);
  const [informalStudies, setInformalStudies] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);

  useEffect(() => {
    const postulantId = query.get('_id');
    if (postulantId) {
      dispatch(getPostulantById(postulantId)).then((selectedPostulant) => {
        setPostulantId(postulantId);
        setPersonalInfo({
          firstName: selectedPostulant.firstName,
          lastName: selectedPostulant.lastName,
          email: selectedPostulant.email,
          password: selectedPostulant.password,
          address: selectedPostulant.address,
          phone: selectedPostulant.phone,
          birthday: selectedPostulant.birthday,
          available: selectedPostulant.available
        });
        setPostulantProfile(selectedPostulant.profiles);
        setPrimaryStudies(selectedPostulant.studies.primaryStudies);
        setSecondaryStudies(selectedPostulant.studies.secondaryStudies);
        setTertiaryStudies(selectedPostulant.studies.tertiaryStudies);
        setUniversityStudies(selectedPostulant.studies.universityStudies);
        setInformalStudies(selectedPostulant.studies.informalStudies);
        setWorkExperience(selectedPostulant.workExperience);
      });
    }
  }, []);
  useEffect(() => {
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
  }, []);

  const parseDate = (string) => {
    return string.split('T')[0];
  };

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
        profiles: formValues.profiles,
        studies: {
          primaryStudies: {
            startDate: formValues.startDatePrimaryStudies,
            endDate: formValues.endDatePrimaryStudies,
            school: formValues.schoolPrimaryStudies
          },
          secondaryStudies: {
            startDate: formValues.startDateSecondaryStudies,
            endDate: formValues.endDateSecondaryStudies,
            school: formValues.schoolSecondaryStudies
          },
          tertiaryStudies: formValues.tertiaryStudies,
          universityStudies: formValues.universityStudies,
          informalStudies: formValues.informalStudies
        },
        workExperience: formValues.workExperience
      })
    ).then((response) => {
      if (response) {
        history.push('/postulant/profile');
        dispatch(getPostulants);
      }
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
    // contact range
    if (formValues.available) {
      if (formValues.from >= formValues.to) {
        errors.from = '"From" hour must be before "to" hour';
        errors.to = '"To" hour must be after "from" hour';
      }
    }
    // primary studies
    if (formValues.startDatePrimaryStudies >= formValues.endDatePrimaryStudies) {
      errors.startDatePrimaryStudies = '';
    }
    if (formValues.schoolPrimary?.length < 5) {
      errors.schoolPrimary = 'School must contain at least 5 characters';
    }
    if (formValues.schoolPrimary?.length > 50) {
      errors.schoolPrimary = 'School must be less than 50 characters';
    }
    // secondary studies
    if (formValues.schoolSecondary?.length < 5) {
      errors.schoolSecondary = 'School must contain at least 5 characters';
    }
    if (formValues.schoolSecondary?.length > 50) {
      errors.schoolSecondary = 'School must be less than 50 characters';
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
                <h2 className={styles.title}>{id ? 'Update a Postulant' : 'Create a Postulant'}</h2>
              </div>
              <h3>Personal Info</h3>
              <div className={styles.fields}>
                <div className={styles.columns}>
                  <Field
                    label={'First Name'}
                    name={'firstName'}
                    placeholder={'First Name'}
                    initialValue={personalInfo.firstName}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Email'}
                    name={'email'}
                    placeholder={'Email'}
                    type={'email'}
                    initialValue={personalInfo.email}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Address'}
                    name={'address'}
                    placeholder={'Address'}
                    initialValue={personalInfo.address}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Birth Date'}
                    name={'birthday'}
                    type={'date'}
                    initialValue={parseDate(personalInfo.birthday)}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    name={'available'}
                    label={'Available?'}
                    type={'checkbox'}
                    initialValue={personalInfo.available}
                    disabled={submitting}
                    component={Checkbox}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Last Name'}
                    name={'lastName'}
                    placeholder={'Last Name'}
                    initialValue={personalInfo.lastName}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Password'}
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    initialValue={personalInfo.password}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'Phone Number'}
                    name={'phoneNumber'}
                    placeholder={'+54113062939'}
                    type={'tel'}
                    initialValue={personalInfo.phone}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    name="profiles"
                    title={'Select a profile'}
                    label={'Profiles'}
                    object={profiles}
                    initialValue={postulantProfile}
                    disabled={submitting}
                    component={Select}
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
