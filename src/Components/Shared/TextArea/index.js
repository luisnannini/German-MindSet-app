import styles from './textarea.module.css';

const TextArea = (props) => {
  return (
    <div className={styles.textAreaContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        className={styles.textArea}
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
        placeholder={props.placeholder}
        maxLength={250}
      ></textarea>
    </div>
  );
};

export default TextArea;
