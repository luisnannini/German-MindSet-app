import styles from './textArea.module.css';

function TextArea(props) {
  return (
    <textarea
      name={props.props}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      className={styles.textarea}
      disabled={props.disabled}
    />
  );
}

export default TextArea;
