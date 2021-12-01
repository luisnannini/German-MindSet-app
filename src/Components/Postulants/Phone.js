import { useState, useEffect } from 'react';

const Phone = ({ postulant, collectData }) => {
  const [phone, setPhone] = useState(postulant ? postulant.phone : '');

  const sendData = (data) => {
    collectData(data, 'phone');
    setPhone(data);
  };
  useEffect(() => sendData(phone), []);

  return (
    <div>
      <h3>Phone</h3>
      <input defaultValue={phone} placeholder="Phone" onChange={(e) => sendData(e.target.value)} />
    </div>
  );
};

export default Phone;
