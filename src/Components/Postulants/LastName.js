import { useState, useEffect } from 'react';

const LastName = ({ postulant, collectData }) => {
  const [lastName, setLastName] = useState(postulant.lastName);

  const sendData = (data) => {
    collectData(data, 'lastName');
    setLastName(data);
  };
  useEffect(() => sendData(lastName), []);

  return (
    <div>
      <h3>Last name</h3>
      <input
        defaultValue={postulant.lastName}
        placeholder="Last name"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default LastName;
