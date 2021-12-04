import { useState, useEffect } from 'react';

const InitialStudies = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : defaultValue);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };

  useEffect(() => sendData(input), []);
  return (
    <div>
      <input
        type="datetime-local"
        defaultValue={
          input.startDate
            ? input.startDate.substring(0, input.startDate.length - 8)
            : '2000-01-01T00:00'
        }
        placeholder="Start Date"
        onChange={(e) => {
          input.startDate = e.target.value;
          sendData({ ...input });
        }}
      />
      <input
        type="datetime-local"
        defaultValue={
          input.endDate ? input.endDate.substring(0, input.endDate.length - 8) : '2000-01-01T00:00'
        }
        placeholder="End Date"
        onChange={(e) => {
          input.endDate = e.target.value;
          sendData({ ...input });
        }}
      />
      <input
        defaultValue={input.school}
        placeholder="School"
        onChange={(e) => {
          input.school = e.target.value; //no se puede encontrar el indice de un array a través de un objeto
          sendData({ ...input });
        }}
      />
    </div>
  );
};

export default InitialStudies;
