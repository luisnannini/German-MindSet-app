import { useState, useEffect } from 'react';

const ContactRange = ({ postulant, collectData }) => {
  const [contactRange, setContactRange] = useState(postulant.contactRange);
  const sendData = (data) => {
    collectData(data, 'contactRange');
    setContactRange(data);
  };
  useEffect(() => sendData(contactRange), []);

  return (
    <div>
      <h3>Contact range</h3>
      <input
        defaultValue={postulant.contactRange.from}
        placeholder="From"
        onChange={(e) => sendData({ ...contactRange, from: e.target.value })}
      />
      <input
        defaultValue={postulant.contactRange.to}
        placeholder="To"
        onChange={(e) => sendData({ ...contactRange, to: e.target.value })}
      />
    </div>
  );
};

export default ContactRange;
