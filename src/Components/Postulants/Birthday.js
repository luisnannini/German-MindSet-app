import { useState, useEffect } from 'react';

const Birthday = ({ postulant, collectData }) => {
  const [birthday, setBirthday] = useState(postulant ? postulant.birthday : '');

  const sendData = (data) => {
    collectData(data, 'birthday');
    setBirthday(data);
  };
  useEffect(() => sendData(birthday), []);

  return (
    <div>
      <h3>Birthday</h3>
      <input
        defaultValue={birthday}
        placeholder="Birthday"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default Birthday;
