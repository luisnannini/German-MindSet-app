const Button = (props) => {
    return (
      <button type="button" id="button" onClick={props.action} className={props.class}>
        {props.name}
      </button>
    );
  };
  
  Button.propTypes = {};
  
  export default Button;