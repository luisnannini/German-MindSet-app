import { useState, useEffect } from 'react';

const SecondaryStudies = ({ postulant, collectData }) => {
  const [secondaryStudies, setSecondaryStudies] = useState(
    postulant ? postulant.studies.secondaryStudies : { startDate: '', endDate: '', school: '' }
  );
  const sendData = (data) => {
    collectData(data, 'secondaryStudies');
    setSecondaryStudies(data);
  };
  useEffect(() => sendData(secondaryStudies), []);

  return (
    <div>
      <h4>Secundary studies</h4>
      <input
        defaultValue={secondaryStudies.startDate}
        placeholder="Start date"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, startDate: value })}
      />
      <input
        defaultValue={secondaryStudies.endDate}
        placeholder="End date"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, endDate: value })}
      />
      <input
        defaultValue={secondaryStudies.school}
        placeholder="School"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, school: value })}
      />
    </div>
  );
};

export default SecondaryStudies;
