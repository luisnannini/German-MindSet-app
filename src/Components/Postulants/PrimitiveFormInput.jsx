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
      <input
        type={typeof input === 'boolean' ? 'checkbox' : 'text'}
        defaultValue={input}
        placeholder={dataName.toUpperCase()}
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default PrimitiveFormInputs;
