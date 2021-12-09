import styles from './textarea.module.css';

const TextArea = (props) => {
  return (
    <div className={styles.textAreaContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        className={styles.textArea}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        maxLength={250}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
      ></textarea>
    </div>
  );
};

export default TextArea;
