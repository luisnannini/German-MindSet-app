import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={props.meta.error && props.meta.touched ? styles.error : styles.input}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.input}
      ></input>
      <span
        className={props.meta.error && props.meta.touched ? styles.errorVisible : styles.errorSpan}
      >
        {props.meta.error}
      </span>
    </div>
  );
};

export default Input;
