import styles from './input.module.css';

const Input = (props) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={styles.input}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
        required={props.required}
        disabled={props.disabled}
      ></input>
    </div>
  );
};

export default Input;
