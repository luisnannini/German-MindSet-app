import { useState, useEffect } from 'react';

const FirstName = ({ postulant, collectData }) => {
  const [firstName, setFirstName] = useState(postulant ? postulant.firstName : '');

  const sendData = (data) => {
    collectData(data, 'firstName');
    setFirstName(data);
  };
  useEffect(() => sendData(firstName), []);

  return (
    <div>
      <h3>First name</h3>
      <input
        defaultValue={firstName}
        placeholder="First name"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default FirstName;
