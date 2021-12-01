import { useState, useEffect } from 'react';

const ObjectFormInputs = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : defaultValue);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);
  return (
    <div>
      {Object.keys(input).map((inputKey, index) => {
        return (
          <input
            defaultValue={input[inputKey]}
            placeholder={inputKey.toUpperCase()}
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
