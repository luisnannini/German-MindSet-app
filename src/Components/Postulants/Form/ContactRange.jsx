import { useState, useEffect } from 'react';

const ContactRange = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : defaultValue);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };

  useEffect(() => sendData(input), []);
  return (
    <div>
      <input
        defaultValue={input.from}
        placeholder="To"
        onChange={(e) => {
          input.to = e.target.value;
        }}
      />
      <input
        defaultValue={input.to}
        placeholder="From"
        onChange={(e) => {
          input.from = e.target.value;
          sendData({ ...input });
        }}
      />
    </div>
  );
};

export default ContactRange;
