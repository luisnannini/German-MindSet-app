import 'postulants-AddItem.module.css';

function AddItem() {
  /* state = {
    title: ''
  }; */
  const onSubmit = () => {
    console.log('asd');
  };
  const onChange = () => {
    console.log('asd');
  };
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex' }}>
      <div>
        <label>NOmbre</label>
        <input
          type="text"
          name="title"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Todo ..."
          value={this.state.title}
          onChange={onChange}
        />
      </div>
      <input type="submit" value="Submit" style={{ flex: '1' }} />
    </form>
  );
}

export default AddItem;
