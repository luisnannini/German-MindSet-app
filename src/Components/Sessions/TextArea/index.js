import styles from './textArea.module.css';

function TextArea(props) {
  return (
    <textarea
      className={styles.textarea}
      name={props.props}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      disabled={props.disabled}
    />
  );
}

export default TextArea;
