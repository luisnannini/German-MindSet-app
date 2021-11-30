import { useState, useEffect } from 'react';

const Address = ({ postulant, collectData }) => {
  const [address, setAddress] = useState(postulant.address);

  const sendData = (data) => {
    collectData(data, 'address');
    setAddress(data);
  };
  useEffect(() => sendData(address), []);

  return (
    <div>
      <h3>Address</h3>
      <input
        defaultValue={postulant.address}
        placeholder="Address"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default Address;
