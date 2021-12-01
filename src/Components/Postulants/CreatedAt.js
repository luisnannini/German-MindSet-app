import { useState, useEffect } from 'react';

const CreatedAt = ({ postulant, collectData }) => {
  const [createdAt, setCreatedAt] = useState(postulant ? postulant.createdAt : '');

  const sendData = (data) => {
    collectData(data, 'createdAt');
    setCreatedAt(data);
  };
  useEffect(() => sendData(createdAt), []);

  return (
    <div>
      <h3>Created at:</h3>
      <input
        defaultValue={createdAt}
        placeholder="Created at:"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default CreatedAt;
