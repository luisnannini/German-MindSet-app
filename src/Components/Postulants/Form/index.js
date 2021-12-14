import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import Checkbox from '../../Shared/Checkbox';
import TextArea from '../../Shared/TextArea';
import { useState } from 'react';

const error = {
  show: false,
  title: 'title',
  message: 'message'
};

const Form = () => {
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

  return (
    <div className={styles.container}>
      <form className={styles.form}>
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
              required={true}
              type={'date'}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
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
              required={true}
              type={'date'}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
            />
          </div>
        </div>
        <h3>Tertiary Studies</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              required={true}
              type={'date'}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
            />
          </div>
        </div>
        <h3>University Studies</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              required={true}
              type={'date'}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
            />
          </div>
        </div>
        <h3>Informal Studies</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              required={true}
              type={'date'}
            />
            <Input
              label={'School'}
              name={'school'}
              placeholder={'School'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
            />
          </div>
        </div>
        <h3>Work Experience</h3>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'Start Date'}
              name={'startDate'}
              placeholder={'Start Date'}
              required={true}
              type={'date'}
            />
            <Input
              label={'Company'}
              name={'company'}
              placeholder={'Company'}
              required={true}
              type={'text'}
            />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Finish Date'}
              name={'finishDate'}
              placeholder={'Finish Date'}
              required={true}
              type={'date'}
            />
            <TextArea
              label={'Description'}
              name={'description'}
              placeholder={'Job Description'}
              required={true}
            />
          </div>
        </div>
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
