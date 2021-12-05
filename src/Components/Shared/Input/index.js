import styles from 'input.module.css';

const Input = (props) => {
  return (
    <>
      <label htmlFor={props.label}></label>
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
        className={styles.input}
      ></input>
    </>
  );
};

export default Input;
