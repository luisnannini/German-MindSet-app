import { useEffect, useState } from 'react';
const Update = (props) => {
  if (props.showUpdate == false) {
    return null;
  }
  const [position, setPosition] = useState([]);
  const [postulant, setPostulant] = useState([]);
  const [interview, setInterview] = useState([]);
  const [positionValue, setPositionValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [interviewValue, setInterviewValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPosition(response.data);
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulant(response.data);
      });
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterview(response.data);
      });
  }, []);
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
  const onSubmit = (id) => {
    //id.preventDefault();
    console.log(id);
    const url = `${process.env.REACT_APP_API}/applications/${id}`;
    //const url = `${process.env.REACT_APP_API}/applications/`;
    console.log(url);
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
      method: 'PUT'
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
      //.then(() => {
      //   window.location.href = `${window.location.origin}/applications`;
      // })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={() => onSubmit(props.updateId)}>
      <h2>Update Application</h2>
      <div>
        <label>Position:</label>
        <select onChange={onChangePosition}>
          {position.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data.jobDescription}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Postulant:</label>
        <select onChange={onChangePostulant}>
          {postulant.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data.firstName + ' ' + data.lastName}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>ID Interview:</label>
        <select onChange={onChangeInterview}>
          {interview.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data._id}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Result:</label>
        <input
          class_id="input"
          value={resultValue}
          onChange={onChangeResult}
          placeholder="Result"
          required
        ></input>
      </div>
      <button onClick={props.onClose}>Cancel</button>
      <button type="submit">Update</button>
    </form>
  );
};

export default Update;
