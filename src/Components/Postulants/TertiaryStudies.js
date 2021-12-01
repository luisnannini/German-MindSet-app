import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TertiaryStudies = ({ postulant, collectData, id }) => {
  const [tertiaryStudies, setTertiaryStudies] = useState(postulant.studies.tertiaryStudies);
  const sendData = (data) => {
    collectData(data, 'tertiaryStudies');
    setTertiaryStudies(data);
  };
  useEffect(() => sendData(tertiaryStudies), []);
  const template = {
    startDate: '',
    endDate: '',
    description: '',
    institute: '',
    id: uuidv4()
  };
  return (
    <div>
      <h4>Tertiary studies</h4>
      {tertiaryStudies.map((tertiaryStudy, index) => {
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
      <button
        onClick={(e) => {
          e.preventDefault();
          setTertiaryStudies([...tertiaryStudies, template]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TertiaryStudies;
