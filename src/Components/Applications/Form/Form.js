import { useState } from 'react';
const Form = (props) => {
  if (props.show == false) {
    return null;
  }
  const [positionValue, setPositionValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [interviewValue, setInterviewValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const onChangePosition = (input) => {
    setPositionValue(input.target.value);
  };
  const onChangePostulant = (input) => {
    setPostulantValue(input.target.value);
  };
  const onChangeInterview = (input) => {
    setInterviewValue(input.target.value);
  };
  const onChangeResult = (input) => {
    setResultValue(input.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/applications`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positions: positionValue,
        postulants: postulantValue,
        interview: interviewValue,
        result: resultValue
      }),
      method: 'POST'
    };

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/applications`;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>ID Position:</label>
        <input
          className="input"
          value={positionValue}
          onChange={onChangePosition}
          placeholder="ID Position"
          pattern="[a-zA-Z0-9]{24}"
          title="ID must be 24 number/letters"
          required
        ></input>
      </div>
      <div>
        <label>ID Postulant:</label>
        <input
          className="input"
          value={postulantValue}
          onChange={onChangePostulant}
          placeholder="ID Postulant"
          pattern="[a-zA-Z0-9]{24}"
          title="ID must be 24 number/letters"
          required
        ></input>
      </div>
      <div>
        <label>ID Interview:</label>
        <input
          className="input"
          value={interviewValue}
          onChange={onChangeInterview}
          placeholder="ID Interview"
          pattern="[a-zA-Z0-9]{24}"
          title="ID must be 24 number/letters"
          required
        ></input>
      </div>
      <div>
        <label>Result:</label>
        <input
          className="input"
          value={resultValue}
          onChange={onChangeResult}
          placeholder="Result"
          required
        ></input>
      </div>
      <button onClick={props.onClose}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
