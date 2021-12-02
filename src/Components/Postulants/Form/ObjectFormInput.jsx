import { useState, useEffect } from 'react';

const ObjectFormInputs = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(
    postulant ? postulant[dataName] : defaultValue ? defaultValue : ''
  );
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  const dates = ['startDate', 'endDate', 'createdAt', 'updatedAt', 'birthday'];
  useEffect(() => sendData(input), []);
  return (
    <div>
      {typeof input === 'object' ? (
        Object.keys(input).map((inputKey, index) => {
          return inputKey === 'id' ? (
            ''
          ) : dates.find((date) => date === inputKey) ? (
            <input
              type="datetime-local"
              key={inputKey}
              defaultValue={
                input[inputKey]
                  ? input[inputKey].substring(0, input[inputKey].length - 8)
                  : '2000-01-01T00:00'
              }
              placeholder={inputKey.toUpperCase()}
              onChange={({ target: { value } }) =>
                sendData({ ...input, [Object.keys(input)[index]]: value })
              }
            />
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
      ) : dates.find((date) => date === dataName) ? (
        <input
          type="datetime-local"
          defaultValue={input ? input.substring(0, input.length - 8) : '2000-01-01T00:00'}
          checked={input}
          placeholder={dataName.toUpperCase()}
          onChange={(e) => sendData(e.target.value)}
        />
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
