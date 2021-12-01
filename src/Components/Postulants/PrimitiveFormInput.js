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
      <h3>{dataName.toUpperCase()}</h3>
      <input
        defaultValue={input}
        placeholder={dataName.toUpperCase()}
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default PrimitiveFormInputs;
