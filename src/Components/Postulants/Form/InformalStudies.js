import Input from '../../Shared/Input';
import styles from './form.module.css';

const InformalStudies = () => {
  return (
    <div className={styles.fields}>
      <div className={styles.columns}>
        <Input label={'Start Date'} name={'startDate'} placeholder={'Start Date'} type={'date'} />
        <Input label={'School'} name={'school'} placeholder={'School'} type={'text'} />
      </div>
      <div className={styles.columns}>
        <Input
          label={'Finish Date'}
          name={'finishDate'}
          placeholder={'Finish Date'}
          type={'date'}
        />
      </div>
    </div>
  );
};

export default InformalStudies;
