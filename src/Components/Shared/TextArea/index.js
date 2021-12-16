import styles from './textarea.module.css';

const TextArea = (props) => {
  return (
    <div className={styles.textAreaContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        className={props.meta.error && props.meta.touched ? styles.error : styles.textArea}
        placeholder={props.placeholder}
        maxLength={250}
        disabled={props.disabled}
        {...props.input}
      ></textarea>
      {props.meta.error && props.meta.touched && (
        <span className={styles.errorSpan}>{props.meta.error}</span>
      )}
    </div>
  );
};

export default TextArea;
