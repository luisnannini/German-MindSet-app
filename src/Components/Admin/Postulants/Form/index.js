import styles from './form.module.css';
import Input from '../../../Shared/Input';
import ButtonCancel from '../../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../../Shared/Modals/ModalError';
import Checkbox from '../../../Shared/Checkbox';
import TextArea from '../../../Shared/TextArea';
import Select from '../../../Shared/Select';
import AddButton from '../../../Shared/Buttons/ButtonLittleAdd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from '../../../../Hooks/useQuery';
import {
  createPostulant,
  getPostulantById,
  updatePostulant,
  getPostulants
} from '../../../../redux/Postulants/thunks';
import { closeErrorModal } from '../../../../redux/Postulants/actions';

const PostulantsForm = () => {
  const error = useSelector((store) => store.postulants.error);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const [id, setPostulantId] = useState(undefined);
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
        setContactRange(selectedPostulant.contactRange);
        setPostulantProfile(selectedPostulant.profiles[0].profileId._id);
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

  // const parseTime = (string) => {
  //   return `${string.split(':')[0]}${string.split(':')[1]}`;
  // };

  const intToTime = (int) => {
    return `${int.toString().slice(0, 2)}:${int.toString().slice(2)}`;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const profile = profiles.filter((profile) => profile._id === postulantProfile);
    const postulantId = query.get('_id');
    if (postulantId) {
      dispatch(
        updatePostulant(postulantId, {
          ...personalInfo,
          contactRange,
          profiles: new Array({ profileId: profile[0]._id }),
          studies: {
            primaryStudies,
            secondaryStudies,
            tertiaryStudies,
            universityStudies,
            informalStudies
          },
          workExperience
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/postulants');
          dispatch(getPostulants);
        }
      });
    } else {
      dispatch(
        createPostulant({
          ...personalInfo,
          contactRange,
          profiles: new Array({ profileId: profile[0]._id }),
          studies: {
            primaryStudies,
            secondaryStudies,
            tertiaryStudies,
            universityStudies,
            informalStudies
          },
          workExperience
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/postulants');
          dispatch(getPostulants);
        }
      });
    }
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <ModalError error={error} onConfirm={() => dispatch(closeErrorModal())} />
      <Form onSubmit={submitForm}>
        {(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
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
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Email'}
                  name={'email'}
                  placeholder={'Email'}
                  type={'email'}
                  initialValue={personalInfo.email}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Address'}
                  name={'address'}
                  placeholder={'Address'}
                  initialValue={personalInfo.address}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Birth Date'}
                  name={'birthday'}
                  type={'date'}
                  initialValue={parseDate(personalInfo.birthday)}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  name={'available'}
                  label={'Available?'}
                  initialValue={personalInfo.available}
                  // onChange={(e) =>
                  //   setPersonalInfo({ ...personalInfo, available: e.target.checked })
                  // }
                  disabled={formProps.submitting}
                  component={Checkbox}
                  validate={required}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  label={'Last Name'}
                  name={'lastName'}
                  placeholder={'Last Name'}
                  initialValue={personalInfo.lastName}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Password'}
                  name={'password'}
                  placeholder={'Password'}
                  type={'password'}
                  initialValue={personalInfo.password}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'Phone Number'}
                  name={'phoneNumber'}
                  placeholder={'+54113062939'}
                  type={'tel'}
                  initialValue={personalInfo.phone}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  name="profiles"
                  title={'Select a profile'}
                  label={'Profiles'}
                  object={profiles}
                  initialValue={postulantProfile}
                  disabled={formProps.submitting}
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
                  initialValue={intToTime(contactRange.from)}
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
              </div>
              <div className={styles.columns}>
                <Field
                  label={'To'}
                  name={'To'}
                  placeholder={'To'}
                  type={'time'}
                  initialValue={intToTime(contactRange.to)}
                  // onChange={(e) =>
                  //   setContactRange({ ...contactRange, to: parseInt(parseTime(e.target.value)) })
                  // }
                  disabled={formProps.submitting}
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
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'School'}
                  name={'schoolPrimary'}
                  placeholder={'School'}
                  type={'text'}
                  initialValue={primaryStudies.school}
                  disabled={formProps.submitting}
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
                  disabled={formProps.submitting}
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
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
                <Field
                  label={'School'}
                  name={'schoolSeconday'}
                  placeholder={'School'}
                  type={'text'}
                  initialValue={secondaryStudies.school}
                  disabled={formProps.submitting}
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
                  disabled={formProps.submitting}
                  component={Input}
                  validate={required}
                />
              </div>
            </div>
            <h3>Tertiary Studies</h3>
            {tertiaryStudies.map((ts, i) => (
              <div className={styles.fields} key={i}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDateTertiaryStudies'}
                    placeholder={'Start Date'}
                    type={'date'}
                    initialValue={ts.startDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   tertiaryStudies[i].startDate = e.target.value;
                    //   setTertiaryStudies([...tertiaryStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Institute'}
                    name={'instituteTertiary'}
                    placeholder={'Institute'}
                    type={'text'}
                    initialValue={ts.institute}
                    // onChange={(e) => {
                    //   tertiaryStudies[i].institute = e.target.value;
                    //   setTertiaryStudies([...tertiaryStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDateTertiaryStudies'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    initialValue={ts.endDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   tertiaryStudies[i].endDate = e.target.value;
                    //   setTertiaryStudies([...tertiaryStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Description'}
                    name={'descriptionTertiaryStudies'}
                    initialValue={ts.description}
                    // onChange={(e) => {
                    //   tertiaryStudies[i].description = e.target.value;
                    //   setTertiaryStudies([...tertiaryStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={TextArea}
                  />
                </div>
              </div>
            ))}
            <div className={styles.addButton}>
              <AddButton
                type="button"
                onClick={() => {
                  setTertiaryStudies([
                    ...tertiaryStudies,
                    { startDate: '', endDate: '', institute: '', description: '' }
                  ]);
                }}
                disabled={isLoading}
              />
            </div>
            <h3>University Studies</h3>
            {universityStudies.map((us, i) => (
              <div className={styles.fields} key={i}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDateUniversityStudies'}
                    placeholder={'Start Date'}
                    type={'date'}
                    value={us.startDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   universityStudies[i].startDate = e.target.value;
                    //   setUniversityStudies([...universityStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Institute'}
                    name={'institueUniversity'}
                    placeholder={'Institute'}
                    type={'text'}
                    initialValue={us.institute}
                    // onChange={(e) => {
                    //   universityStudies[i].institute = e.target.value;
                    //   setUniversityStudies([...universityStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDateUniversityStudies'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    initialValue={us.endDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   universityStudies[i].endDate = e.target.value;
                    //   setUniversityStudies([...universityStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <TextArea
                    label={'Description'}
                    name={'descriptionUniversityStudies'}
                    initialValue={us.description}
                    // onChange={(e) => {
                    //   universityStudies[i].description = e.target.value;
                    //   setUniversityStudies([...universityStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={TextArea}
                  />
                </div>
              </div>
            ))}
            <div className={styles.addButton}>
              <AddButton
                type="button"
                onClick={() => {
                  setUniversityStudies([
                    ...universityStudies,
                    { startDate: '', endDate: '', institute: '', description: '' }
                  ]);
                }}
                disabled={isLoading}
              />
            </div>
            <h3>Informal Studies</h3>
            {informalStudies.map((is, i) => (
              <div className={styles.fields} key={i}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDateInformalStudies'}
                    placeholder={'Start Date'}
                    type={'date'}
                    initialValue={is.startDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   informalStudies[i].startDate = e.target.value;
                    //   setInformalStudies([...informalStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Institute'}
                    name={'instituteInformal'}
                    placeholder={'Institute'}
                    type={'text'}
                    initialValue={is.institute}
                    // onChange={(e) => {
                    //   informalStudies[i].institute = e.target.value;
                    //   setInformalStudies([...informalStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDateInformalStudies'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    intialValue={is.endDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   informalStudies[i].endDate = e.target.value;
                    //   setInformalStudies([...informalStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Description'}
                    name={'description'}
                    initialValue={is.description}
                    // onChange={(e) => {
                    //   informalStudies[i].description = e.target.value;
                    //   setInformalStudies([...informalStudies]);
                    // }}
                    disabled={formProps.submitting}
                    component={TextArea}
                  />
                </div>
              </div>
            ))}
            <div className={styles.addButton}>
              <AddButton
                type="button"
                onClick={() => {
                  setInformalStudies([
                    ...informalStudies,
                    { startDate: '', endDate: '', institute: '', description: '' }
                  ]);
                }}
                disabled={isLoading}
              />
            </div>
            <h3>Work Experience</h3>
            {workExperience.map((we, i) => (
              <div className={styles.fields} key={i}>
                <div className={styles.columns}>
                  <Field
                    label={'Start Date'}
                    name={'startDateWorkExperience'}
                    placeholder={'Start Date'}
                    type={'date'}
                    intialValue={we.startDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   workExperience[i].startDate = e.target.value;
                    //   setWorkExperience([...workExperience]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <Field
                    label={'Company'}
                    name={'company'}
                    placeholder={'Company'}
                    type={'text'}
                    initialValue={we.company}
                    // onChange={(e) => {
                    //   workExperience[i].company = e.target.value;
                    //   setWorkExperience([...workExperience]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                </div>
                <div className={styles.columns}>
                  <Field
                    label={'Finish Date'}
                    name={'endDateWorkExperience'}
                    placeholder={'Finish Date'}
                    type={'date'}
                    initialValue={we.endDate.substring(0, 10)}
                    // onChange={(e) => {
                    //   workExperience[i].endDate = e.target.value;
                    //   setWorkExperience([...workExperience]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                  <TextArea
                    label={'Description'}
                    name={'descriptionWorkExperience'}
                    initialValue={we.description}
                    // onChange={(e) => {
                    //   workExperience[i].description = e.target.value;
                    //   setWorkExperience([...workExperience]);
                    // }}
                    disabled={formProps.submitting}
                    component={Input}
                  />
                </div>
              </div>
            ))}
            <div className={styles.addButton}>
              <AddButton
                type="button"
                onClick={() => {
                  setWorkExperience([
                    ...workExperience,
                    { startDate: '', endDate: '', company: '', description: '' }
                  ]);
                }}
                disabled={isLoading}
              />
            </div>
            <div className={styles.button}>
              <ButtonCancel
                disabled={isLoading}
                onClick={() => history.push('/admin/postulants')}
              />
              <ButtonConfirm disabled={isLoading} type={'submit'} />
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default PostulantsForm;
