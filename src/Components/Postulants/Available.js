import { useState, useEffect } from 'react';

const Available = ({ postulant, collectData }) => {
  const [available, setAvailable] = useState(postulant ? postulant.available : '');

  const sendData = (data) => {
    collectData(data, 'available');
    setAvailable(data);
  };
  useEffect(() => sendData(available), []);

  return (
    <div>
      <h3>Available</h3>
      <input
        type="checkbox"
        defaultValue={available}
        placeholder="Available"
        onChange={(e) => sendData(e.target.checked)}
      />
    </div>
  );
};

export default Available;
