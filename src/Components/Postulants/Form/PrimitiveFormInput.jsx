import { useState, useEffect } from 'react';

const PrimitiveFormInputs = ({ postulant, collectData, dataName }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : '');

  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);

  return (
    <div>
      {dataName === 'birthday' || dataName === 'createdAt' || dataName === 'updatedAt' ? (
        <input
          type="datetime-local"
          defaultValue={
            input.startDate
              ? input.startDate.substring(0, input.startDate.length - 8)
              : '2000-01-01T00:00'
          }
          placeholder="Start Date"
          onChange={(e) => {
            sendData(e.target.value);
          }}
        />
      ) : dataName === 'available' ? (
        <input type="checkbox" checked={input} onChange={(e) => sendData(e.target.checked)} />
      ) : (
        <input
          defaultValue={input}
          placeholder={dataName.toUpperCase()}
          onChange={(e) => sendData(e.target.value)}
        />
      )}
    </div>
  );
};

export default PrimitiveFormInputs;
