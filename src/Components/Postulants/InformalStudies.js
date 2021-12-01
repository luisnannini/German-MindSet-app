import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InformalStudies = ({ postulant, collectData, id }) => {
  const [informalStudies, setInformalStudies] = useState(postulant.studies.informalStudies);
  const sendData = (data) => {
    collectData(data, 'informalStudies');
    setInformalStudies(data);
  };
  useEffect(() => sendData(informalStudies), []);
  const template = {
    startDate: '',
    endDate: '',
    description: '',
    institute: '',
    id: uuidv4()
  };
  return (
    <div>
      <h4>Informal studies</h4>
      {informalStudies.map((informalStudy, index) => {
        return (
          <div key={informalStudy.id}>
            <input
              defaultValue={informalStudy.startDate}
              placeholder="Start date"
              onChange={({ target: { value } }) => {
                informalStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...informalStudies]);
              }}
            />
            <input
              defaultValue={informalStudy.endDate}
              placeholder="End date"
              onChange={({ target: { value } }) => {
                informalStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...informalStudies]);
              }}
            />
            <textarea
              defaultValue={informalStudy.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                informalStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...informalStudies]);
              }}
            ></textarea>
            <input
              defaultValue={informalStudy.institute}
              placeholder="Institute"
              onChange={({ target: { value } }) => {
                informalStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...informalStudies]);
              }}
            />
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          setInformalStudies([...informalStudies, template]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default InformalStudies;
