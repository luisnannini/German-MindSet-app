import { useState, useEffect } from 'react';

const Email = ({ postulant, collectData }) => {
  const [email, setEmail] = useState(postulant.email);

  const sendData = (data) => {
    collectData(data, 'email');
    setEmail(data);
  };
  useEffect(() => sendData(email), []);

  return (
    <div>
      <h3>Email</h3>
      <input
        defaultValue={postulant.email}
        placeholder="Email"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default Email;
