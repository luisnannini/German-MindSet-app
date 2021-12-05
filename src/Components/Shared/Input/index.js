import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.label}>{props.label.toUpperCase()}</label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        step={props.step}
        pattern={props.pattern}
        className={styles.input}
      ></input>
    </div>
  );
};

export default Input;
