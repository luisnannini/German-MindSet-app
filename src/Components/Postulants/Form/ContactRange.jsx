import { useState, useEffect } from 'react';

const ContactRange = ({ postulantData, setData }) => {
  return (
    <div>
      <input
        defaultValue={postulantData.from}
        placeholder="From"
        onChange={(e) => {
          setData({ ...postulantData, from: e.target.value });
        }}
      />
      <input
        defaultValue={postulantData.to}
        placeholder="To"
        onChange={(e) => {
          setData({ ...postulantData, to: e.target.value });
        }}
      />
    </div>
  );
};

export default ContactRange;
