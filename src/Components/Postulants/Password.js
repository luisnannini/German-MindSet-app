import { useState, useEffect } from 'react';

const Password = ({ postulant, collectData }) => {
  const [password, setPassword] = useState(postulant.password);

  const sendData = (data) => {
    collectData(data, 'password');
    setPassword(data);
  };
  useEffect(() => sendData(password), []);

  return (
    <div>
      <h3>Password</h3>
      <input
        defaultValue={postulant.password}
        placeholder="Password"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default Password;
