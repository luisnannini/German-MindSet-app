import { useState, useEffect } from 'react';

const Available = ({ postulant, collectData, dataName }) => {
  const [available, setAvailable] = useState(postulant ? postulant[dataName] : true);

  const sendData = (data) => {
    collectData(data, dataName);
    setAvailable(data);
  };
  useEffect(() => sendData(available), []);

  return (
    <div>
      <input
        defaultValue={available}
        placeholder={dataName.toUpperCase()}
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default Available;
