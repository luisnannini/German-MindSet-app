import { useState, useEffect } from 'react';

const SecondaryStudies = ({ postulant, collectData }) => {
  const [secondaryStudies, setSecondaryStudies] = useState(postulant.studies.secondaryStudies);
  const sendData = (data) => {
    collectData(data, 'secondaryStudies');
    setSecondaryStudies(data);
  };
  useEffect(() => sendData(secondaryStudies), []);

  return (
    <div>
      <h4>Secundary studies</h4>
      <input
        defaultValue={postulant.studies.secondaryStudies.startDate}
        placeholder="Start date"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, startDate: value })}
      />
      <input
        defaultValue={postulant.studies.secondaryStudies.endDate}
        placeholder="End date"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, endDate: value })}
      />
      <input
        defaultValue={postulant.studies.secondaryStudies.school}
        placeholder="School"
        onChange={({ target: { value } }) => sendData({ ...secondaryStudies, school: value })}
      />
    </div>
  );
};

export default SecondaryStudies;
