import styles from './signup.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import RemoveButton from '../../Shared/Buttons/ButtonRemove';
import ModalError from '../../Shared/Modals/ModalError';
import Checkbox from '../../Shared/Checkbox';
import TextArea from '../../Shared/TextArea';
import Select from '../../Shared/Select';
import AddButton from '../../Shared/Buttons/ButtonLittleAdd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import {
  createPostulant,
  getPostulantById,
  updatePostulant,
  getPostulants
} from '../../../redux/Postulants/thunks';
import { closeErrorModal } from '../../../redux/Postulants/actions';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

const Signup = () => {
  const error = useSelector((store) => store.postulants.error);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [profiles, setProfiles] = useState([]);
  const [postulantProfile, setPostulantProfile] = useState({});
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
  const [contactRange, setContactRange] = useState({
    from: '',
    to: ''
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
    // schoolPrimary
    if (formValues.schoolPrimary?.length < 5) {
      errors.schoolPrimary = 'School must contain at least 5 characters';
    }
    if (formValues.schoolPrimary?.length > 50) {
      errors.schoolPrimary = 'School must be less than 50 characters';
    }
    // schoolSecondary
    if (formValues.schoolSecondary?.length < 5) {
      errors.schoolSecondary = 'School must contain at least 5 characters';
    }
    if (formValues.schoolSecondary?.length > 50) {
      errors.schoolSecondary = 'School must be less than 50 characters';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  const submitForm = (formValues) => {
    dispatch(
      createPostulant({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        address: formValues.address,
        phone: formValues.phoneNumber,
        birthday: formValues.birthday,
        available: formValues.available,
        contactRange: {
          from: formValues.from,
          to: formValues.to
        },
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
        history.push('/admin/postulants');
        dispatch(getPostulants);
      }
    });
  };

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form
        onSubmit={submitForm}
        validate={validate}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit,
          form: {
            mutators: { push }
          }, // injected from final-form-arrays above
          pristine,
          submitting,
          values
        }) => {
          return (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.header}>
                <h2 className={styles.title}>Register</h2>
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
                    validate={required}
                  />
                </div>
              </div>
              <h3>Contact Range</h3>
              <div className={styles.fields}>
                <div className={styles.columns}>
                  <Field
                    label={'From'}
                    name={'from'}
                    placeholder={'From'}
                    type={'time'}
                    initialValue={contactRange.from}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'To'}
                    name={'to'}
                    placeholder={'To'}
                    type={'time'}
                    initialValue={contactRange.to}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
              </div>
              <h3>Primary Studies</h3>
              <div className={styles.fields}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDatePrimaryStudies'}
                    placeholder={'Start Date'}
                    type={'date'}
                    initialValue={parseDate(primaryStudies.startDate)}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'School'}
                    name={'schoolPrimaryStudies'}
                    placeholder={'School'}
                    type={'text'}
                    initialValue={primaryStudies.school}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDatePrimaryStudies'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    initialValue={parseDate(primaryStudies.endDate)}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
              </div>
              <h3>Secondary Studies</h3>
              <div className={styles.fields}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDateSecondaryStudies'}
                    placeholder={'Start Date'}
                    type={'date'}
                    initialValue={parseDate(secondaryStudies.startDate)}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                  <Field
                    label={'School'}
                    name={'schoolSecondaryStudies'}
                    placeholder={'School'}
                    type={'text'}
                    initialValue={secondaryStudies.school}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDateSecondaryStudies'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    initialValue={parseDate(secondaryStudies.endDate)}
                    disabled={submitting}
                    component={Input}
                    validate={required}
                  />
                </div>
              </div>
              <h3>Tertiary Studies</h3>
              <FieldArray name="tertiaryStudies">
                {({ fields }) => (
                  <div>
                    {fields.map((ts, index) => (
                      <div key={ts}>
                        <div className={styles.fields}>
                          <div className={styles.columns}>
                            <Field
                              label={'Start Date'}
                              name={`${ts}.startDate`}
                              placeholder={'Start Date'}
                              type={'date'}
                              initialValue={ts.startDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Institute'}
                              name={`${ts}.institute`}
                              placeholder={'Institute'}
                              type={'text'}
                              initialValue={ts.institute}
                              disabled={submitting}
                              component={Input}
                            />
                          </div>
                          <div className={styles.columns}>
                            <Field
                              label={'Finish Date'}
                              name={`${ts}.endDate`}
                              placeholder={'Finish Date'}
                              type={'date'}
                              initialValue={ts.endDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Description'}
                              name={`${ts}.description`}
                              initialValue={ts.description}
                              disabled={submitting}
                              component={TextArea}
                            />
                          </div>
                        </div>
                        <div className={styles.removeButton}>
                          <RemoveButton onClick={() => fields.remove(index)} />
                        </div>
                      </div>
                    ))}
                    <div className={styles.addButton}>
                      <AddButton
                        type="button"
                        onClick={() => push('tertiaryStudies', undefined)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </FieldArray>
              <h3>University Studies</h3>
              <FieldArray name="universityStudies">
                {({ fields }) => (
                  <div>
                    {fields.map((us, index) => (
                      <div key={us}>
                        <div className={styles.fields}>
                          <div className={styles.columns}>
                            <Field
                              label={'Start Date'}
                              name={`${us}.startDate`}
                              placeholder={'Start Date'}
                              type={'date'}
                              initialValue={us.startDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Institute'}
                              name={`${us}.institute`}
                              placeholder={'Institute'}
                              type={'text'}
                              initialValue={us.institute}
                              disabled={submitting}
                              component={Input}
                            />
                          </div>
                          <div className={styles.columns}>
                            <Field
                              label={'Finish Date'}
                              name={`${us}.endDate`}
                              placeholder={'Finish Date'}
                              type={'date'}
                              initialValue={us.endDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Description'}
                              name={`${us}.description`}
                              initialValue={us.description}
                              disabled={submitting}
                              component={TextArea}
                            />
                          </div>
                        </div>
                        <div className={styles.removeButton}>
                          <RemoveButton onClick={() => fields.remove(index)} />
                        </div>
                      </div>
                    ))}
                    <div className={styles.addButton}>
                      <AddButton
                        type="button"
                        onClick={() => push('universityStudies', undefined)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </FieldArray>
              <h3>Informal Studies</h3>
              <FieldArray name="informalStudies">
                {({ fields }) => (
                  <div>
                    {fields.map((is, index) => (
                      <div key={is}>
                        <div className={styles.fields}>
                          <div className={styles.columns}>
                            <Field
                              label={'Start Date'}
                              name={`${is}.startDate`}
                              placeholder={'Start Date'}
                              type={'date'}
                              initialValue={is.startDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Institute'}
                              name={`${is}.institute`}
                              placeholder={'Institute'}
                              type={'text'}
                              initialValue={is.institute}
                              disabled={submitting}
                              component={Input}
                            />
                          </div>
                          <div className={styles.columns}>
                            <Field
                              label={'Finish Date'}
                              name={`${is}.endDate`}
                              placeholder={'Finish Date'}
                              type={'date'}
                              initialValue={is.endDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Description'}
                              name={`${is}.description`}
                              initialValue={is.description}
                              disabled={submitting}
                              component={TextArea}
                            />
                          </div>
                        </div>
                        <div className={styles.removeButton}>
                          <RemoveButton onClick={() => fields.remove(index)} />
                        </div>
                      </div>
                    ))}
                    <div className={styles.addButton}>
                      <AddButton
                        type="button"
                        onClick={() => push('informalStudies', undefined)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </FieldArray>
              <h3>Work Experience</h3>
              <FieldArray name="workExperience">
                {({ fields }) => (
                  <div>
                    {fields.map((we, index) => (
                      <div key={we}>
                        <div className={styles.fields}>
                          <div className={styles.columns}>
                            <Field
                              label={'Start Date'}
                              name={`${we}.startDate`}
                              placeholder={'Start Date'}
                              type={'date'}
                              initialValue={we.startDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Institute'}
                              name={`${we}.institute`}
                              placeholder={'Institute'}
                              type={'text'}
                              initialValue={we.institute}
                              disabled={submitting}
                              component={Input}
                            />
                          </div>
                          <div className={styles.columns}>
                            <Field
                              label={'Finish Date'}
                              name={`${we}.endDate`}
                              placeholder={'Finish Date'}
                              type={'date'}
                              initialValue={we.endDate}
                              disabled={submitting}
                              component={Input}
                            />
                            <Field
                              label={'Description'}
                              name={`${we}.description`}
                              initialValue={we.description}
                              disabled={submitting}
                              component={TextArea}
                            />
                          </div>
                        </div>
                        <div className={styles.removeButton}>
                          <RemoveButton onClick={() => fields.remove(index)} />
                        </div>
                      </div>
                    ))}
                    <div className={styles.addButton}>
                      <AddButton
                        type="button"
                        onClick={() => push('workExperience', undefined)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className={styles.button}>
                <ButtonCancel
                  disabled={isLoading}
                  onClick={() => history.push('/admin/postulants')}
                />
                <ButtonConfirm disabled={submitting || pristine} type={'submit'} />
              </div>
            </form>
          );
        }}
      />
    </div>
  );
};

export default Signup;
