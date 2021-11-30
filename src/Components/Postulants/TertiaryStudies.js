import { useState, useEffect } from 'react';

const TertiaryStudies = ({ postulant, collectData, id }) => {
  const [tertiaryStudies, setTertiaryStudies] = useState(postulant.studies.tertiaryStudies);
  const sendData = (data) => {
    collectData(data, 'tertiaryStudies');
    setTertiaryStudies(data);
  };
  useEffect(() => sendData(tertiaryStudies), []);

  return (
    <div>
      <h4>Tertiary studies</h4>
      {postulant.studies.tertiaryStudies.map((tertiaryStudy, index) => {
        return (
          <div key={tertiaryStudy.id}>
            <input
              defaultValue={tertiaryStudy.startDate}
              placeholder="Start date"
              onChange={({ target: { value } }) => {
                tertiaryStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...tertiaryStudies]);
              }}
            />
            <input
              defaultValue={tertiaryStudy.endDate}
              placeholder="End date"
              onChange={({ target: { value } }) => {
                tertiaryStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...tertiaryStudies]);
              }}
            />
            <textarea
              defaultValue={tertiaryStudy.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                tertiaryStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...tertiaryStudies]);
              }}
            ></textarea>
            <input
              defaultValue={tertiaryStudy.institute}
              placeholder="Institute"
              onChange={({ target: { value } }) => {
                tertiaryStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...tertiaryStudies]);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TertiaryStudies;
