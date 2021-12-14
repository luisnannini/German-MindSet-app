import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import Checkbox from '../../Shared/Checkbox';
import TextArea from '../../Shared/TextArea';
import TertiaryStudies from './TertiaryStudies';
import UniversityStudies from './UniversityStudies';
import InformalStudies from './InformalStudies';
import WorkExperience from './WorkExperience';
import AddButton from '../../Shared/Buttons/ButtonLittleAdd';
import { useState } from 'react';

const error = {
  show: false,
  title: 'title',
  message: 'message'
};

const Form = () => {
  const [inputsCounter, setCounter] = useState({
    tertiaryStudies: 0,
    universityStudies: 0,
    informalStudies: 0,
    workExperience: 0
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
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

  const submitForm = (e) => {
    e.preventDefault();
    console.log(personalInfo);
    console.log(tertiaryStudies);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles.header}>
          <h2 className={styles.title}>FORM</h2>
        </div>
        <h3>Personal Info</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'First Name'}
              name={'firstName'}
              placeholder={'First Name'}
              pattern="[A-Za-z ]*"
              required={true}
              onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
            />
            <Input
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
              required={true}
              type={'email'}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            />
            <Input
              label={'Address'}
              name={'address'}
              placeholder={'Address'}
              required={true}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
            />
            <Input label={'Birth Date'} name={'birthday'} type={'date'} required={true} />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Last Name'}
              pattern="[A-Za-z ]*"
              required={true}
              onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
            />
            <Input
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              required={true}
              type={'password'}
              onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
            />
            <Input
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'+54113062939'}
              required={true}
              type={'tel'}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
            />
            <Checkbox
              label={'Available?'}
              onChange={(e) => setPersonalInfo({ ...personalInfo, available: e.target.checked })}
            />
          </div>
        </div>
        <h3>Primary Studies</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              type={'date'}
              onChange={(e) => setPrimaryStudies({ ...primaryStudies, startDate: e.target.value })}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              type={'text'}
              onChange={(e) => setPrimaryStudies({ ...primaryStudies, school: e.target.value })}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              type={'date'}
              onChange={(e) => setPrimaryStudies({ ...primaryStudies, endDate: e.target.value })}
            />
          </div>
        </div>
        <h3>Secondary Studies</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              type={'date'}
              onChange={(e) =>
                setSecondaryStudies({ ...secondaryStudies, startDate: e.target.value })
              }
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              type={'text'}
              onChange={(e) => setSecondaryStudies({ ...secondaryStudies, school: e.target.value })}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              type={'date'}
              onChange={(e) =>
                setSecondaryStudies({ ...secondaryStudies, endDate: e.target.value })
              }
            />
          </div>
        </div>
        <h3>Tertiary Studies</h3>
        {[...Array(inputsCounter.tertiaryStudies)].map((_, i) => (
          <div className={styles.fields} key={i}>
            <div className={styles.columns}>
              <Input
                label={'Start Date'}
                name={'startDate'}
                placeholder={'Start Date'}
                type={'date'}
                onChange={(e) => (tertiaryStudies[i].startDate = e.target.value)}
              />
              <Input
                label={'Institute'}
                name={'institute'}
                placeholder={'Institute'}
                type={'text'}
                onChange={(e) => (tertiaryStudies[i].institute = e.target.value)}
              />
            </div>
            <div className={styles.columns}>
              <Input
                label={'Finish Date'}
                name={'endDate'}
                placeholder={'Finish Date'}
                type={'date'}
                onChange={(e) => (tertiaryStudies[i].endDate = e.target.value)}
              />
              <TextArea
                label={'Description'}
                name={'description'}
                onChange={(e) => (tertiaryStudies[i].description = e.target.value)}
              />
            </div>
          </div>
        ))}
        <AddButton
          type="button"
          onClick={() => {
            setTertiaryStudies([...tertiaryStudies, { startDate: '', endDate: '', institute: '' }]);
            setCounter({ ...inputsCounter, tertiaryStudies: inputsCounter.tertiaryStudies + 1 });
            console.log(tertiaryStudies);
          }}
        />
        <h3>University Studies</h3>
        {[...Array(inputsCounter.universityStudies)].map((_, i) => (
          <UniversityStudies key={i}></UniversityStudies>
        ))}
        <AddButton
          type="button"
          onClick={() =>
            setCounter({ ...inputsCounter, universityStudies: inputsCounter.universityStudies + 1 })
          }
        />
        <h3>Informal Studies</h3>
        {[...Array(inputsCounter.informalStudies)].map((_, i) => (
          <InformalStudies key={i}></InformalStudies>
        ))}
        <AddButton
          type="button"
          onClick={() =>
            setCounter({ ...inputsCounter, informalStudies: inputsCounter.informalStudies + 1 })
          }
        />
        <h3>Work Experience</h3>
        {[...Array(inputsCounter.workExperience)].map((_, i) => (
          <WorkExperience key={i}></WorkExperience>
        ))}
        <AddButton
          type="button"
          onClick={() =>
            setCounter({ ...inputsCounter, workExperience: inputsCounter.workExperience + 1 })
          }
        />
        <div className={styles.button}>
          <ButtonCancel onClick={() => history.push('/profiles')} />
          <ButtonConfirm type={'submit'} />
        </div>
        <ModalError error={error} />
      </form>
    </div>
  );
};

export default Form;
