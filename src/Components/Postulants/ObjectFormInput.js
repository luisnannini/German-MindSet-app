import { useState, useEffect } from 'react';

const ObjectFormInputs = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : defaultValue);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);
  console.log(Object.values(input)[0]);
  return (
    <div>
      <h4>{dataName.toUpperCase()}</h4>
      {Object.keys(input).map((inputKey, index) => {
        return (
          <input
            defaultValue={input[inputKey]}
            placeholder={inputKey}
            onChange={({ target: { value } }) =>
              sendData({ ...input, [Object.keys(input)[index]]: value })
            }
          />
        );
      })}
    </div>
  );
};

export default ObjectFormInputs;
