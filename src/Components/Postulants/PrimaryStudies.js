import { useState, useEffect } from 'react';

const PrimaryStudies = ({ postulant, collectData }) => {
  const [primaryStudies, setPrimaryStudies] = useState(postulant.studies.primaryStudies);
  const sendData = (data) => {
    collectData(data, 'primaryStudies');
    setPrimaryStudies(data);
  };
  useEffect(() => sendData(primaryStudies), []);

  return (
    <div>
      <h4>Primary studies</h4>
      <input
        defaultValue={primaryStudies.startDate}
        placeholder="Start date"
        onChange={({ target: { value } }) => sendData({ ...primaryStudies, startDate: value })}
      />
      <input
        defaultValue={primaryStudies.endDate}
        placeholder="End date"
        onChange={({ target: { value } }) => sendData({ ...primaryStudies, endDate: value })}
      />
      <input
        defaultValue={primaryStudies.school}
        placeholder="School"
        onChange={({ target: { value } }) => sendData({ ...primaryStudies, school: value })}
      />
    </div>
  );
};

export default PrimaryStudies;
