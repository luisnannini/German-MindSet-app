import PsyElem from './PsychologistElem';
import styles from './psychologistList.module.css';

const PsyList = (props) => {
  const psyListElem = props.name;
  return (
    <ul className={styles.listElem}>
      <li>
        <PsyElem data={psyListElem.firstName} />
      </li>
      <li>
        <PsyElem data={psyListElem.lastName} />
      </li>
      <li>
        <PsyElem data={psyListElem.username} />
      </li>
      <li>
        <PsyElem data={psyListElem.email} />
      </li>
      <li>
        <PsyElem data={psyListElem.phone} />
      </li>
      <li>
        <PsyElem data={psyListElem.address} />
      </li>
      <li>
        <a href="/">edit</a>
      </li>
      <li>
        <a href="/">delete</a>
      </li>
    </ul>
  );
};

export default PsyList;
