const Button = (props) => {
  return (
    <button type="button" id="button" onClick={props.action}>
      {props.name}
    </button>
  );
};

Button.propTypes = {};

export default Button;
