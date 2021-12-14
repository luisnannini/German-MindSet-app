import Input from '../../Shared/Input';
import styles from './form.module.css';
import TextArea from '../../Shared/TextArea';

const WorkExperience = () => {
  return (
    <div className={styles.fields}>
      <div className={styles.columns}>
        <Input label={'Start Date'} name={'startDate'} placeholder={'Start Date'} type={'date'} />
        <Input label={'Company'} name={'company'} placeholder={'Company'} type={'text'} />
      </div>
      <div className={styles.columns}>
        <Input
          label={'Finish Date'}
          name={'finishDate'}
          placeholder={'Finish Date'}
          type={'date'}
        />
        <TextArea label={'Description'} name={'description'} placeholder={'Job Description'} />
      </div>
    </div>
  );
};

export default WorkExperience;
