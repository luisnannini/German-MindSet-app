import { useState, useEffect } from 'react';

const UpdatedAt = ({ postulant, collectData }) => {
  const [updatedAt, setUpdatedAt] = useState(postulant.updatedAt);

  const sendData = (data) => {
    collectData(data, 'updatedAt');
    setUpdatedAt(data);
  };
  useEffect(() => sendData(updatedAt), []);

  return (
    <div>
      <h3>Updated at:</h3>
      <input
        defaultValue={postulant.updatedAt}
        placeholder="Updated at:"
        onChange={(e) => sendData(e.target.value)}
      />
    </div>
  );
};

export default UpdatedAt;
