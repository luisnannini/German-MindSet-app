import { useState, useEffect } from 'react';

const ObjectFormInputs = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(
    postulant ? postulant[dataName] : defaultValue ? defaultValue : ''
  );
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);
  return (
    <div>
      {typeof input === 'object' ? (
        Object.keys(input).map((inputKey, index) => {
          return inputKey === 'id' ? (
            ''
          ) : (
            <input
              key={inputKey}
              defaultValue={input[inputKey]}
              placeholder={inputKey.toUpperCase()}
              onChange={({ target: { value } }) =>
                sendData({ ...input, [Object.keys(input)[index]]: value })
              }
            />
          );
        })
      ) : (
        <input
          type={typeof input === 'boolean' ? 'checkbox' : 'text'}
          defaultValue={input}
          checked={input}
          placeholder={dataName.toUpperCase()}
          onChange={(e) => sendData(e.target.type === 'text' ? e.target.value : e.target.checked)}
        />
      )}
    </div>
  );
};

export default ObjectFormInputs;
