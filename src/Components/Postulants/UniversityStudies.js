import { useState, useEffect } from 'react';

const UniversityStudies = ({ postulant, collectData, id }) => {
  const [universityStudies, setUniversityStudies] = useState(postulant.studies.universityStudies);
  const sendData = (data) => {
    collectData(data, 'universityStudies');
    setUniversityStudies(data);
  };
  useEffect(() => sendData(universityStudies), []);

  return (
    <div>
      <h4>University studies</h4>
      {postulant.studies.universityStudies.map((universityStudy, index) => {
        return (
          <div key={universityStudy.id}>
            <input
              defaultValue={universityStudy.startDate}
              placeholder="Start date"
              onChange={({ target: { value } }) => {
                universityStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...universityStudies]);
              }}
            />
            <input
              defaultValue={universityStudy.endDate}
              placeholder="End date"
              onChange={({ target: { value } }) => {
                universityStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...universityStudies]);
              }}
            />
            <textarea
              defaultValue={universityStudy.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                universityStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...universityStudies]);
              }}
            ></textarea>
            <input
              defaultValue={universityStudy.institute}
              placeholder="Institute"
              onChange={({ target: { value } }) => {
                universityStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...universityStudies]);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UniversityStudies;
