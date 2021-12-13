import styles from './form.module.css';
import Input from '../../Shared/Input';
import ButtonCancel from '../../Shared/Buttons/ButtonCancel';
import ButtonConfirm from '../../Shared/Buttons/ButtonConfirm';
import ModalError from '../../Shared/ModalError';
import Checkbox from '../../Shared/Checkbox';

const error = {
  show: false,
  title: 'title',
  message: 'message'
};

const Form = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h2 className={styles.title}>FORM</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.columns}>
            <Input
              label={'First Name'}
              name={'firstName'}
              placeholder={'First Name'}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Input
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
              pattern="[A-Za-z ]*"
              required={true}
              type={'email'}
            />
            <Input label={'Address'} name={'address'} placeholder={'Address'} required={true} />
            <Input label={'Birth Date'} name={'birthday'} type={'date'} required={true} />
          </div>
          <div className={styles.columns}>
            <Input
              label={'Last Name'}
              name={'lastName'}
              placeholder={'Last Name'}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Input
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              required={true}
              type={'password'}
            />
            <Input
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'+54113062939'}
              required={true}
              type={'tel'}
            />
            <Checkbox label={'Available?'} />
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
