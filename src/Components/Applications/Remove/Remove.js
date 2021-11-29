const Remove = (props) => {
  if (props.showRemove == false) {
    return null;
  }
  return (
    <div>
      <h2>Do you want to delete ?</h2>
      <button onClick={props.onClose}>Cancel</button>
      <button onClick={props.removeConfirm}>Confirm</button>
    </div>
  );
};

export default Remove;
